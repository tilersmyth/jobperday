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
import { UserService } from '../src/app/user/user.service';
import { CompanyModule } from '../src/app/company/company.module';
import { CompanyService } from '../src/app/company/services';
import { CompanyEntity } from '../src/app/company/entity';

describe('CompanyResolver', () => {
  let app: INestApplication;
  let userService: UserService;
  let companyService: CompanyService;

  let companyId: string;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CompanyModule,
        AuthModule,
        UserModule,
        SecurityModule,
        GraphQLModule.forRootAsync({
          useClass: GqlConfigService,
        }),
      ],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    companyService = moduleFixture.get<CompanyService>(CompanyService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Setup', async () => {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    it('should create test user', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input: user },
          query:
            'mutation Register($input: RegisterInput!) {register(input: $input)}',
        });

      await userService.updateUserByEmail(user.email, {
        is_verified: true,
      });

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {
            input: { email: user.email, password: user.password },
          },
          query: `mutation Login($input: LoginInput!) {
            login(input: $input) {
              accessToken
              refreshToken
            }
          }
        `,
        });

      accessToken = body.data.login.accessToken;

      expect(body.data.login.accessToken).toBeTruthy();
    });
  });

  describe('Create', async () => {
    const input = {
      name: faker.company.companyName(),
    };

    let company: CompanyEntity;

    it('should create company', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input },
          query: `mutation CreateCompany($input: CreateCompanyInput!){
            createCompany(input:$input){
              id
              name
              setup_complete
              setup_stage
            }
          }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

      company = body.data.createCompany;

      companyId = company.id;

      expect(company.name).toEqual(input.name);
    });

    it('should show incomplete setup', () => {
      expect(company.setup_complete).toBeFalsy();
    });

    it('should have setup stage equal to 0', () => {
      expect(company.setup_stage).toEqual(0);
    });
  });

  describe('Create Profile', async () => {
    it('should create company profile', async () => {
      const input = {
        companyId,
        profile: {
          profile_image: 'profile.png',
          cover_image: 'cover.png',
          about: 'Best company in town!',
          business_type: 'entertainment',
        },
      };

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input },
          query: `mutation CreateCompanyProfile($input: CreateCompanyProfileInput!){
            createCompanyProfile(input:$input)
          }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

      const { createCompanyProfile } = body.data;
      expect(createCompanyProfile).toBeTruthy();
    });

    it('should have setup stage equal to 1', async () => {
      const company = await companyService.findOneById(companyId);
      expect(company.setup_stage).toEqual(1);
    });
  });

  describe('Create Address', async () => {
    it('should create company address', async () => {
      const input = {
        companyId,
        address: {
          street: '1 main st',
          city: 'Boston',
          state: 'MA',
          postal_code: '02110',
          phone: '555-555-5555',
          country: 'USA',
        },
      };

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input },
          query: `mutation CreateCompanyAddress($input: CreateCompanyAddressInput!){
            createCompanyAddress(input:$input)
          }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

      const { createCompanyAddress } = body.data;
      expect(createCompanyAddress).toBeTruthy();
    });

    let company: CompanyEntity;

    it('should have setup stage equal to 2', async () => {
      company = await companyService.findOneById(companyId);
      expect(company.setup_stage).toEqual(2);
    });

    it('should show setup complete', () => {
      expect(company.setup_complete).toBeTruthy();
    });
  });
});
