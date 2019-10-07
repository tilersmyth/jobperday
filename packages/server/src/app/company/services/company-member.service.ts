import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AppLogger } from '../../app.logger';
import { CompanyMemberEntity } from '../entity';
import { COMPANY_MEMBER_TOKEN } from '../company.constants';
import { AddMember } from '../interfaces/add-member.interface';

@Injectable()
export class CompanyMemberService {
  private logger = new AppLogger(CompanyMemberService.name);

  constructor(
    @Inject(COMPANY_MEMBER_TOKEN)
    protected readonly repository: Repository<CompanyMemberEntity>,
  ) {}

  public async add(input: AddMember): Promise<CompanyMemberEntity> {
    const member = new CompanyMemberEntity();
    member.company = input.company;
    member.user = input.user;
    member.role = input.role;
    member.confirmed = input.confirmed;
    const savedMember = await this.repository.save(member);

    this.logger.debug(
      `[add] created member (${input.role}) for ${input.company.name}`,
    );

    return savedMember;
  }

  public async find(companyId: string): Promise<CompanyMemberEntity[]> {
    return this.repository.find({
      where: { company: companyId },
      relations: ['user'],
    });
  }
}
