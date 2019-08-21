// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();

import faker from 'faker';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from '../src/app/user/user.module';
import { SecurityModule } from '../src/app/security';
import { GqlConfigService } from '../src/app/_helpers';
import { AuthModule } from '../src/app/auth/auth.module';
import { UserErrorEnum } from '../src/app/user/user-error.enum';
import { UserService } from '../src/app/user/user.service';

describe('AuthResolver', () => {
  let app: INestApplication;
  let userService: UserService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        SecurityModule,
        GraphQLModule.forRootAsync({
          useClass: GqlConfigService,
        }),
      ],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  describe('Register', async () => {
    it('should successfully create user', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input: user },
          query:
            'mutation Register($input: RegisterInput!) {register(input: $input)}',
        });

      expect(body.data.register).toBeTruthy();
    });
  });

  describe('Login', async () => {
    const LoginMutation = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            accessToken
            refreshToken
          }
        }
      `;

    it('User is not found', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            input: { email: user.email + 'x', password: user.password },
          },
          query: LoginMutation,
        });

      expect(body.errors.length).toEqual(1);
      expect(body.errors[0].message.condition).toEqual(UserErrorEnum.NOT_FOUND);
    });

    it('User is not verified', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            input: { email: user.email, password: user.password },
          },
          query: LoginMutation,
        });

      expect(body.errors.length).toEqual(1);
      expect(body.errors[0].message.condition).toEqual(
        UserErrorEnum.NOT_VERIFIED,
      );
    });

    it('User has access token', async () => {
      const updatedUser = await userService.updateUserByEmail(user.email, {
        is_verified: true,
      });

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            input: { email: user.email, password: user.password },
          },
          query: LoginMutation,
        });

      accessToken = body.data.login.accessToken;

      expect(updatedUser.is_verified).toBeTruthy();
      expect(body.data.login).toBeDefined();
    });

    it('Me (current user)', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `query{
              me{
                first_name
                last_name
                email
                id
              }
            }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

      expect(body.data.me.email).toEqual(user.email);
    });
  });
});
