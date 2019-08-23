import { Injectable } from '@nestjs/common';
import faker from 'faker';

import { UserService } from '../../src/app/user/user.service';
import { createAuthToken } from '../../src/app/auth/jwt';
import { UserEntity } from '../../src/app/user/entity';
import { CompanyService } from '../../src/app/company/services';
import { CompanyEntity } from '../../src/app/company/entity';

@Injectable()
export class TestSeedService {
  private token: string;
  private userEntity: UserEntity;
  private companyEntity: CompanyEntity;

  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  get accessToken() {
    return this.token;
  }

  get testUser() {
    return this.userEntity;
  }

  get testCompany() {
    return this.companyEntity;
  }

  public async user(): Promise<void> {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Create user
    await this.userService.create(user);

    // Verify user
    await this.userService.updateUserByEmail(user.email, {
      is_verified: true,
    });

    // Login user
    const login = await this.userService.login({
      email: user.email,
      password: user.password,
    });

    this.userEntity = login;

    // Create token
    const token = await createAuthToken(login);

    this.token = token.accessToken;
  }

  public async company(): Promise<void> {
    // Create user
    await this.user();

    const input = {
      name: faker.company.companyName(),
    };

    // Create company
    const company = await this.companyService.create(this.userEntity, input);

    this.companyEntity = company;
  }
}
