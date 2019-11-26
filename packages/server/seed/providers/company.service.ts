import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import { AppLogger } from '../../src/app';
import { UserEntity } from '../../src/app/user/entity';
import { COMPANY_TOKEN } from '../../src/app/company/company.constants';
import { CompanyEntity } from '../../src/app/company/entity';
import { SlugGeneratorUtil } from '../../src/app/_helpers';
import { CompanyMemberService } from '../../src/app/company-member';
import { CompanyProfileService } from '../../src/app/company-profile';
import { randomNum } from '../utils/randomNum.util';

@Injectable()
export class CompanySeedService {
  private logger = new AppLogger(CompanySeedService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly memberService: CompanyMemberService,
    private readonly profileService: CompanyProfileService,
  ) {}

  public async generateSlug(name: string): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name);
  }

  async save(users: UserEntity[]): Promise<CompanyEntity[]> {
    const companies: CompanyEntity[] = [];

    for (const user of users) {
      const companyName = faker.company.companyName();

      const imageIndex = randomNum(1, 11);

      const profile = await this.profileService.create({
        profile_image: `https://jobperday-dev.s3.amazonaws.com/sample/profile/profile_sample-${imageIndex}.png`,
        cover_image:
          'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_cover.jpg',
        about: 'about this company....',
      });

      const company = new CompanyEntity();
      company.name = companyName;
      company.slug = await this.generateSlug(companyName);
      company.setup_complete = true;
      company.active = true;
      company.profile = profile;
      const savedCompany = await this.repository.save(company);

      await this.memberService.add(
        {
          userId: user.id,
          role: 'owner',
          confirmed: true,
        },
        savedCompany,
      );

      companies.push(savedCompany);
    }

    return companies;
  }
}
