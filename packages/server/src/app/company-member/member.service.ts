import { Injectable, Inject } from '@nestjs/common';
import { Repository, EntityManager, getManager } from 'typeorm';

import { AppLogger } from '../app.logger';
import { CrudService } from '../../base';
import { CompanyMemberEntity } from './entity/member.entity';
import { COMPANY_MEMBER_TOKEN } from './member.constants';
import { UserEntity } from '../user/entity';
import { CompanyEntity } from '../company/entity';
import { CompanyMemberInput } from './inputs';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyMemberService extends CrudService<CompanyMemberEntity> {
  private logger = new AppLogger(CompanyMemberService.name);

  constructor(
    @Inject(COMPANY_MEMBER_TOKEN)
    protected readonly repository: Repository<CompanyMemberEntity>,
    private readonly userService: UserService,
  ) {
    super();
  }

  public async add(
    input: CompanyMemberInput,
    company: CompanyEntity,
    transaction?: EntityManager,
  ): Promise<CompanyMemberEntity> {
    const member = new CompanyMemberEntity();
    Object.assign(member, input);

    this.logger.debug(
      `[add] created member (${input.role}) for ${company.name}`,
    );

    member.company = company;

    if (transaction) {
      member.user = await transaction.findOne(UserEntity, {
        where: { id: input.userId },
      });

      return transaction.save(member);
    }

    member.user = await this.userService.findOne({
      where: { id: input.userId },
    });

    return this.repository.save(member);
  }

  public async find(companyId: string): Promise<CompanyMemberEntity[]> {
    return this.repository.find({
      where: { company: companyId },
      relations: ['user'],
    });
  }

  public async findAllCompanies(
    user: UserEntity,
  ): Promise<CompanyMemberEntity[]> {
    return this.repository.find({
      where: { user },
      relations: ['company'],
    });
  }

  public async create(
    company: CompanyEntity,
    inputs: CompanyMemberInput[],
  ): Promise<CompanyMemberEntity[]> {
    return getManager().transaction(async transaction => {
      company.setup_complete = true;
      await transaction.save(company);

      const members: CompanyMemberEntity[] = [];

      for (const input of inputs) {
        const member = new CompanyMemberEntity();

        const user = await transaction.findOne(UserEntity, {
          where: { id: input.userId },
        });

        member.role = input.role;
        member.user = user;

        const savedMember = await transaction.save(member);
        members.push(savedMember);
      }

      return members;
    });
  }
}
