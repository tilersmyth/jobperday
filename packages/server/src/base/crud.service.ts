import { HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import {
  BaseEntity,
  Repository,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { validate, ValidatorOptions, ValidationError } from 'class-validator';
import { UserInputError } from 'apollo-server-core';

import { config } from '../config';
import { SecurityService } from '../app/security/security.service';
import { RestVoterActionEnum } from '../app/security/voter/rest-voter-action.enum';

interface GqlValidationError {
  [key: string]: string;
}

export class CrudService<T extends BaseEntity> {
  protected repository: Repository<T>;

  @Inject(forwardRef(() => SecurityService))
  protected readonly securityService: SecurityService<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(options);
    await this.securityService.denyAccessUnlessGranted(
      RestVoterActionEnum.READ_ALL,
      entities,
    );
    return entities;
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

  public async findOne(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    await this.securityService.denyAccessUnlessGranted(
      RestVoterActionEnum.READ,
      entity,
    );
    return entity;
  }

  private errorReducer = (acc: GqlValidationError, error: ValidationError) => {
    const key = Object.keys(error.constraints)[0];
    return { [error.property]: error.constraints[key], ...acc };
  };

  protected async validate(entity: T, options?: ValidatorOptions) {
    const valErrors = await validate(entity, {
      ...config.validator,
      options,
    } as ValidatorOptions);
    if (valErrors.length) {
      const errors: GqlValidationError = valErrors.reduce(
        this.errorReducer,
        {},
      );
      throw new UserInputError('register_error', {
        errors,
      });
    }
  }
}
