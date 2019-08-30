import { Injectable } from '@nestjs/common';
import faker from 'faker';

import { UserService } from '../../src/app/user/user.service';
import { UserEntity } from '../../src/app/user/entity';
import { CompanyService } from '../../src/app/company/services';
import { CompanyEntity } from '../../src/app/company/entity';
import { GqlReqUtil } from './gql-req.util';

@Injectable()
export class TestSeedService {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  public async user(gqlReq: GqlReqUtil): Promise<UserEntity> {
    const fakeUser: any = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Create user
    const user = await this.userService.create(fakeUser);

    // Verify user
    await this.userService.updateUserByEmail(fakeUser.email, {
      is_verified: true,
    });

    const req = await gqlReq.send(
      `mutation Login($input: LoginInput!) {
      login(input: $input)
    }`,
      {
        input: {
          email: fakeUser.email,
          password: fakeUser.password,
        },
      },
    );

    gqlReq.setCookie = req.header['set-cookie'];

    return user;
  }

  public async company(gqlReq: GqlReqUtil): Promise<CompanyEntity> {
    // Create user
    const user = await this.user(gqlReq);

    const input = {
      name: faker.company.companyName(),
    };

    // Create company
    return this.companyService.create(user, input);
  }
}
