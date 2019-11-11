import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';

import { CrudService } from '../../base';
import { AppLogger } from '../app.logger';
import { CompanyEntity } from './entity';
import { COMPANY_TOKEN } from './company.constants';
import { UserEntity } from '../user/entity';
import { UserService } from '../user/user.service';
import { CompanyMemberService } from '../company-member/member.service';
import { CompanyInput, UpdateCompanyInput } from './inputs';
import { SlugGeneratorUtil } from '../_helpers';

@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  private logger = new AppLogger(CompanyService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly userService: UserService,
    private readonly memberService: CompanyMemberService,
  ) {
    super();
  }

  public async create(
    user: UserEntity,
    input: CompanyInput,
  ): Promise<CompanyEntity> {
    return getManager().transaction(async transaction => {
      // Save company
      const company = new CompanyEntity();
      Object.assign(company, input);

      await this.validate(company);

      const savedCompany = await transaction.save(company);

      // Update user realm
      if (user.realm !== 'employer') {
        const candidate = await this.userService.findOneById(user.id);
        candidate.realm = 'employer';
        await transaction.save(candidate);
        // update session
        user.realm = 'employer';
      }

      // Add user as company account owner
      await this.memberService.add(
        {
          userId: user.id,
          role: 'owner',
          confirmed: true,
        },
        savedCompany,
        transaction,
      );

      return savedCompany;
    });
  }

  public async update(
    company: CompanyEntity,
    input: UpdateCompanyInput,
  ): Promise<CompanyEntity> {
    // Update company
    Object.assign(company, input);
    return company.save();
  }

  /**
   * Check if provided slug is available
   * if not, returns one that is
   */
  public async generateSlug(name: string): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name);
  }

  /**
   * Check if provided slug is available
   * if not, return null
   */
  public async findSlug(name: string): Promise<string | null> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.available(name);
  }
}
