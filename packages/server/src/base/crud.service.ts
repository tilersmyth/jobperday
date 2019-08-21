import { HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { BaseEntity, Repository, FindOneOptions } from 'typeorm';
import { validate, ValidatorOptions } from 'class-validator';

import { config } from '../config';
import { SecurityService } from '../app/security/security.service';
import { RestVoterActionEnum } from '../app/security/voter/rest-voter-action.enum';
import { typeormFilterMapper } from '../app/_helpers';

export class CrudService<T extends BaseEntity> {
  protected repository: Repository<T>;

  @Inject(forwardRef(() => SecurityService))
  protected readonly securityService: SecurityService<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async findOneById(id: string): Promise<T> {
    try {
      const entity = await this.repository.findOneOrFail(id);
      await this.securityService.denyAccessUnlessGranted(
        RestVoterActionEnum.READ,
        entity,
      );
      return entity;
    } catch (e) {
      throw new HttpException(
        {
          error: 'Database',
          message: 'Item not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  protected async validate(entity: T, options?: ValidatorOptions) {
    const errors = await validate(entity, {
      ...config.validator,
      options,
    } as ValidatorOptions);
    if (errors.length) {
      throw new HttpException(
        {
          errors,
          type: 'validation',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
