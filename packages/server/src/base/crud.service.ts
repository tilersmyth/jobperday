import { HttpException, HttpStatus } from '@nestjs/common';
import {
  BaseEntity,
  Repository,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { validate, ValidatorOptions, ValidationError } from 'class-validator';
import { UserInputError } from 'apollo-server-core';

import { config } from '../config';

interface GqlValidationError {
  [key: string]: string;
}

export class CrudService<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  public async findOneById(id: string): Promise<T> {
    try {
      return this.repository.findOneOrFail(id);
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
    return this.repository.findOne(options);
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
