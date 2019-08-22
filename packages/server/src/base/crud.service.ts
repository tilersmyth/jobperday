import { HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import {
  BaseEntity,
  Repository,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { validate, ValidatorOptions } from 'class-validator';

import { config } from '../config';
import { SecurityService } from '../app/security/security.service';
import { RestVoterActionEnum } from '../app/security/voter/rest-voter-action.enum';

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
