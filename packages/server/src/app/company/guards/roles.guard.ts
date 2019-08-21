import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AppLogger } from '../../app.logger';
import { CompanyMemberService } from '../services';
import {
  memberRoles,
  MemberRoles,
} from '../../_helpers/company/member-roles.types';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new AppLogger(RolesGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly memberService: CompanyMemberService,
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

    const member = await this.memberService.findOneByUser(
      input.companyId,
      req.user.id,
    );

    if (!member) {
      return false;
    }

    this.logger.debug(
      `[access granted] user is ${member.role}, route role is ${role}`,
    );

    const memberRoleIndex: number = RolesGuard.roleIndex(member.role);

    return routeRoleIndex >= memberRoleIndex;
  }
}
