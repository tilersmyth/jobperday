import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AppLogger } from '../../app.logger';
import { CompanyService } from '../services';
import { MemberRoles } from '../../types/member-roles.type';
import { CompanyMemberEntity } from '../entity';
import { memberRoles } from '../../_helpers';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new AppLogger(RolesGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly companyService: CompanyService,
  ) {}

  private static roleIndex(role: MemberRoles): number {
    return memberRoles.indexOf(role);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<MemberRoles>('role', context.getHandler());

    if (!role) {
      return true;
    }

    const routeRoleIndex: number = RolesGuard.roleIndex(role);

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { input } = ctx.getArgs();

    // Verify by either slug or id
    const where = input.companySlug
      ? { slug: input.companySlug }
      : { id: input.companyId };

    const company = await this.companyService.findOne({
      where,
      relations: ['members'],
    });

    if (!company || !company.members) {
      return false;
    }

    const member = company.members.find(
      (m: CompanyMemberEntity) => m.userId === req.session.user.id,
    );

    if (!member) {
      return false;
    }

    // Append company to req for service use
    req.company = company;

    this.logger.debug(
      `[access granted] user is ${member.role}, route role is ${role}`,
    );

    const memberRoleIndex: number = RolesGuard.roleIndex(member.role);

    return routeRoleIndex >= memberRoleIndex;
  }
}
