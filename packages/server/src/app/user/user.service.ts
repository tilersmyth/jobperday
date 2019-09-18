import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-core';
import { Request } from 'express';

import { CrudService } from '../../base';
import { UserEntity } from './entity/user.entity';
import { USER_TOKEN } from './user.constants';
import { RegisterInput, LoginInput } from '../auth/inputs';
import { AppLogger } from '../app.logger';
import { hashPassword, MailService } from '../_helpers';
import { config } from '../../config';
import { ExpressContext } from '../types/context.interface';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  private logger = new AppLogger(UserService.name);

  constructor(
    @Inject(USER_TOKEN) protected readonly repository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) {
    super();
  }

  public async find(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    this.logger.debug(`[findByEmail] Looking in users for ${email}`);

    const user = await this.repository.findOne({ where: { email } });
    if (user) {
      this.logger.debug(
        `[findByEmail] Found in users an user with id ${user.id}`,
      );
    } else {
      this.logger.debug(
        `[findByEmail] Not found in users an user with email ${email}`,
      );
    }
    return user;
  }

  public async create(input: RegisterInput, req: Request): Promise<UserEntity> {
    const user = new UserEntity();
    user.first_name = input.first_name;
    user.last_name = input.last_name;
    user.email = input.email;
    user.password = input.password;

    await this.validate(user);

    if (config.env === 'development') {
      user.is_verified = true;
    }

    // const test_params = {
    //   Source: 'info@jobperday.com',
    //   Destination: {
    //     ToAddresses: ['tyler.smith.la@gmail.com'],
    //   },
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: 'UTF-8',
    //         Data: 'verification email content',
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: 'verification email',
    //     },
    //   },
    // };

    // await this.mailService.send(test_params);

    const newUser = await this.repository.save(user);

    req.session.user = newUser;

    return newUser;
  }

  public async login(input: LoginInput, req: Request): Promise<UserEntity> {
    const user = await this.findByEmail(input.email);

    if (!user || user.password !== hashPassword(input.password)) {
      throw new UserInputError('Invalid email or password');
    }

    if (!user.is_verified) {
      throw new UserInputError('Account not verified');
    }

    // no easy way to exclude result property using typeorm
    // https://github.com/typeorm/typeorm/issues/535
    delete user.password;

    req.session.user = user;

    return user;
  }

  async logout(ctx: ExpressContext): Promise<UserEntity> {
    const user = ctx.req.session.user;

    await ctx.req.session.destroy(() => {
      return false;
    });
    await ctx.res.clearCookie('qid');

    return user;
  }

  public async updateUserByEmail(
    email: string,
    args: any,
  ): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    Object.assign(user, args);
    return user.save();
  }
}
