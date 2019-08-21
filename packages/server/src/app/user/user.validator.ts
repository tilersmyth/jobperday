import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { UserService } from './user.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  public async validate(email: string) {
    if (!this.userService) {
      return true;
    }

    const user = await this.userService.findByEmail(email);
    return !user;
  }

  defaultMessage(_: ValidationArguments) {
    return '$value is associated with existing account';
  }
}
