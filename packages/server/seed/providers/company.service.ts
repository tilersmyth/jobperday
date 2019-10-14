import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import { AppLogger } from '../../src/app';
import { UserEntity } from '../../src/app/user/entity';
import { COMPANY_TOKEN } from '../../src/app/company/company.constants';
import { CompanyEntity } from '../../src/app/company/entity';
import { SlugGeneratorUtil } from '../../src/app/_helpers';
import { CompanyMemberService } from '../../src/app/company/services';

@Injectable()
export class CompanySeedService {
  private logger = new AppLogger(CompanySeedService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly memberService: CompanyMemberService,
  ) {}

  public async generateSlug(name: string): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name);
  }

  async save(users: UserEntity[]): Promise<CompanyEntity[]> {
    const companies: CompanyEntity[] = [];

    for (const user of users) {
      const companyName = faker.company.companyName();

      const company = new CompanyEntity();
      company.name = companyName;
      company.slug = await this.generateSlug(companyName);
      company.setup_complete = true;
      company.active = true;
      company.phone = '555-555-5555';
      const savedCompany = await this.repository.save(company);

      await this.memberService.add({
        user,
        company: savedCompany,
        role: 'owner',
        confirmed: true,
      });

      companies.push(savedCompany);
    }

    return companies;
  }
}
