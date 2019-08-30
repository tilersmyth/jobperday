// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();

import faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UserModule } from '../src/app/user/user.module';
import { AuthModule } from '../src/app/auth/auth.module';
import { UserService } from '../src/app/user/user.service';
import { TestUtilsService, GqlReqUtil, session } from './services';
import { TestModule } from './test.module';

describe('AuthResolver', () => {
  let app: INestApplication;
  let testUtils: TestUtilsService;
  let userService: UserService;
  let gqlReq: GqlReqUtil;

  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule, AuthModule, UserModule],
    }).compile();

    // Clean DB
    testUtils = moduleFixture.get<TestUtilsService>(TestUtilsService);
    await testUtils.reloadFixtures();

    userService = moduleFixture.get<UserService>(UserService);

    app = moduleFixture.createNestApplication();

    app.use(session());

    gqlReq = new GqlReqUtil(app);

    await app.init();
  });

  afterAll(async () => {
    await testUtils.closeDbConnection();
    await app.close();
  });

  describe('Register', async () => {
    it('should successfully create user', async () => {
      const { body } = await gqlReq.send(
        `mutation Register($input: RegisterInput!) {
          register(input: $input)
        }`,
        { input: user },
      );

      expect(body.data.register).toBeTruthy();
    });
  });

  describe('Login', async () => {
    const LoginMutation = `
        mutation Login($input: LoginInput!) {
          login(input: $input)
        }
      `;

    it('User is not found', async () => {
      const { body } = await gqlReq.send(LoginMutation, {
        input: {
          email: user.email + 'x',
          password: user.password,
        },
      });

      expect(body.errors.length).toEqual(1);
      expect(body.errors[0].message).toEqual('Invalid email or password');
    });

    it('User is not verified', async () => {
      const { body } = await gqlReq.send(LoginMutation, {
        input: {
          email: user.email,
          password: user.password,
        },
      });

      expect(body.errors.length).toEqual(1);
      expect(body.errors[0].message).toEqual('Account not verified');
    });

    it('Set user session', async () => {
      await userService.updateUserByEmail(user.email, {
        is_verified: true,
      });

      const req = await gqlReq.send(LoginMutation, {
        input: {
          email: user.email,
          password: user.password,
        },
      });

      gqlReq.setCookie = req.header['set-cookie'];

      expect(req.body.data.login).toBeTruthy();
    });

    it('Me (current user)', async () => {
      const { body } = await gqlReq.send(
        `query{
            me{
              email
            }
          }`,
      );

      expect(body.data.me.email).toEqual(user.email);
    });
  });
});
