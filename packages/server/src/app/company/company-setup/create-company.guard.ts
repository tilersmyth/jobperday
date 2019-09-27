import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AppLogger } from '../../app.logger';
import { CompanyService } from '../services';
import { MemberRoles } from '../../types/member-roles.type';
import { CompanyMemberEntity } from '../entity';
import { memberRoles } from '../../_helpers';

@Injectable()
export class CreateCompanyGuard implements CanActivate {
  private logger = new AppLogger(CreateCompanyGuard.name);

  constructor(private readonly companyService: CompanyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { input } = ctx.getArgs();

    if (!input.companyId) {
      return true;
    }

    const company = await this.companyService.findOne({
      where: { id: input.companyId },
      relations: ['members'],
    });

    if (!company || !company.members) {
      return false;
    }

    const member = company.members.find(
      (m: CompanyMemberEntity) => m.userId === req.session.user.id,
    );

    if (!member || member.role !== 'owner') {
      return false;
    }

    // Append company to req for service use
    req.company = company;

    return true;
  }
}
