import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { CompanyService } from '../../company.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class CompanySlugValidator implements ValidatorConstraintInterface {
  constructor(protected readonly companyService: CompanyService) {}

  public async validate(slug: string) {
    if (!this.companyService) {
      return true;
    }

    const company = await this.companyService.findOne({ where: { slug } });
    return !company;
  }

  defaultMessage(_: ValidationArguments) {
    return '$value is already in use';
  }
}
