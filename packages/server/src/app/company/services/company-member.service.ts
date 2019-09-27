import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AppLogger } from '../../app.logger';
import { CompanyMemberEntity } from '../entity';
import { COMPANY_MEMBER_TOKEN } from '../company.constants';
import { AddMemberInput } from '../inputs/add-member.input';

@Injectable()
export class CompanyMemberService {
  private logger = new AppLogger(CompanyMemberService.name);

  constructor(
    @Inject(COMPANY_MEMBER_TOKEN)
    protected readonly repository: Repository<CompanyMemberEntity>,
  ) {}

  public async add(input: AddMemberInput): Promise<CompanyMemberEntity> {
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
}
