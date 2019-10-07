import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AppLogger } from '../../app.logger';
import { CompanyMemberEntity, CompanyEntity } from '../entity';
import { COMPANY_MEMBER_TOKEN } from '../company.constants';
import { UserEntity } from '../../user/entity';
import { EmployerCompany } from './interfaces/employer-company.interface';

@Injectable()
export class FindCompanyService {
  private logger = new AppLogger(FindCompanyService.name);

  constructor(
    @Inject(COMPANY_MEMBER_TOKEN)
    protected readonly repository: Repository<CompanyMemberEntity>,
  ) {}

  public async findAll(user: UserEntity): Promise<CompanyMemberEntity[]> {
    return this.repository.find({ where: { user }, relations: ['company'] });
  }

  public async findOne(
    user: UserEntity,
    company: CompanyEntity,
  ): Promise<EmployerCompany> {
    const member = company.members.find(m => m.userId === user.id);
    return { ...company, member };
  }
}
