import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isMemberAuth, MemberRoles } from '@jobperday/common';

import { AppLogger } from '../../app.logger';
import { CompanyService } from '../company.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new AppLogger(RolesGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly companyService: CompanyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let role = this.reflector.get<MemberRoles>('role', context.getHandler());

    if (!role) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const args = ctx.getArgs();

    // Verify by either slug or id
    const where = args.companySlug
      ? { slug: args.companySlug }
      : { id: args.companyId };

    const company = await this.companyService.findOne({
      where,
      relations: ['members'],
    });

    if (!company || !company.members) {
      this.logger.debug(`[access denied] error finding company`);
      return false;
    }

    // Filter members who are not current user
    const members = company.members.filter(
      m => m.userId === req.session.user.id,
    );

    // Check that current user has role
    if (members.length === 0) {
      this.logger.debug(
        `[access denied] user is not listed as member of company`,
      );
      return false;
    }

    // Append company to req for service use
    req.company = Object.assign(company, { members });

    // If company setup is not complete 'owner' role is required
    if (!company.setup_complete) {
      role = 'owner';
    }

    const isAuth = isMemberAuth(role, members[0].role);

    if (!isAuth) {
      this.logger.debug(
        `[access denied] user is ${members[0].role}, route role is ${role}`,
      );
      return false;
    }

    this.logger.debug(
      `[access granted] user is ${members[0].role}, route role is ${role}`,
    );
    return true;
  }
}
