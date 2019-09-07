import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import { AppLogger } from '../../src/app';
import { USER_TOKEN } from '../../src/app/user/user.constants';
import { UserEntity } from '../../src/app/user/entity';
import { inspect } from 'util';

@Injectable()
export class UserSeedService {
  private logger = new AppLogger(UserSeedService.name);

  constructor(
    @Inject(USER_TOKEN) protected readonly repository: Repository<UserEntity>,
  ) {}

  private create(count: number): UserEntity[] {
    const users: UserEntity[] = [];

    for (let i = 1; i <= count; i++) {
      const user = new UserEntity();
      user.first_name = faker.name.firstName();
      user.last_name = faker.name.lastName();
      user.email = faker.internet.email();
      user.password = 'password';
      user.is_verified = true;
      user.realm = 'employer';
      users.push(user);
    }

    return users;
  }

  async save(count: number): Promise<UserEntity[]> {
    this.logger.log(`Creating ${count} owners`);

    const users = this.create(count);
    return this.repository.save(users);
  }
}
