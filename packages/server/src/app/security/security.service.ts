import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

import { AuthorizationChecker } from './auth-checker';

@Injectable()
export class SecurityService<T extends BaseEntity> {
  constructor(private readonly authorizationChecker: AuthorizationChecker) {}

  public async denyAccessUnlessGranted(
    attributes: string,
    subject: T | T[],
  ): Promise<boolean> {
    const isGranted = await this.authorizationChecker.isGranted(
      attributes,
      subject,
    );
    if (!isGranted) {
      throw new ForbiddenException(
        `You don't have permission to access this resource`,
      );
    }
    return isGranted;
  }
}
