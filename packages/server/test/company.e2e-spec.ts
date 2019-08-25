// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();

import faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UserModule } from '../src/app/user/user.module';
import { AuthModule } from '../src/app/auth/auth.module';
import { CompanyModule } from '../src/app/company/company.module';
import { CompanyService } from '../src/app/company/services';
import { CompanyEntity } from '../src/app/company/entity';
import { TestUtilsService, TestSeedService, GqlReqUtil } from './services';
import { TestModule } from './test.module';

describe('CompanyResolver', async () => {
  let app: INestApplication;
  let gqlReq: GqlReqUtil;
  let testUtils: TestUtilsService;
  let companyService: CompanyService;

  let companySlug: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [TestSeedService],
      imports: [TestModule, CompanyModule, AuthModule, UserModule],
    }).compile();

    // Clean DB
    testUtils = moduleFixture.get<TestUtilsService>(TestUtilsService);
    await testUtils.reloadFixtures();

    // Seed test DB
    const seedService = moduleFixture.get<TestSeedService>(TestSeedService);
    await seedService.user();

    companyService = moduleFixture.get<CompanyService>(CompanyService);

    app = moduleFixture.createNestApplication();
    gqlReq = new GqlReqUtil(app);
    gqlReq.token = seedService.accessToken;
    await app.init();
  });

  afterAll(async () => {
    await testUtils.closeDbConnection();
    await app.close();
  });

  describe('Create Company', async () => {
    const input = {
      name: faker.company.companyName(),
    };

    let company: CompanyEntity;

    it('should create company', async () => {
      const { body } = await gqlReq.send(
        `mutation CreateCompany($input: CreateCompanyInput!){
            createCompany(input:$input){
              id
              name
              slug
              setup_complete
              setup_stage
            }
          }`,
        { input },
      );

      company = body.data.createCompany;
      companySlug = company.slug;

      expect(company.name).toEqual(input.name);
    });

    it('should show incomplete setup', () => {
      expect(company.setup_complete).toBeFalsy();
    });

    it('should have setup stage equal to 0', () => {
      expect(company.setup_stage).toEqual(0);
    });
  });

  describe('Create Company Profile', async () => {
    it('should create company profile', async () => {
      const input = {
        companySlug,
        profile: {
          profile_image: 'profile.png',
          cover_image: 'cover.png',
          about: 'Best company in town!',
          business_type: 'entertainment',
        },
      };

      const { body } = await gqlReq.send(
        `mutation CreateCompanyProfile($input: CreateCompanyProfileInput!){
            createCompanyProfile(input:$input)
          }`,
        { input },
      );

      const { createCompanyProfile } = body.data;
      expect(createCompanyProfile).toBeTruthy();
    });

    it('should have setup stage equal to 1', async () => {
      const company = await companyService.findOne({
        where: { slug: companySlug },
      });

      expect(company.setup_stage).toEqual(1);
    });
  });

  describe('Create Company Address', async () => {
    it('should create company address', async () => {
      const input = {
        companySlug,
        address: {
          street: '1 main st',
          city: 'Boston',
          state: 'MA',
          postal_code: '02110',
          phone: '555-555-5555',
          country: 'USA',
        },
      };

      const { body } = await gqlReq.send(
        `mutation CreateCompanyAddress($input: CreateCompanyAddressInput!){
            createCompanyAddress(input:$input)
          }`,
        { input },
      );

      const { createCompanyAddress } = body.data;
      expect(createCompanyAddress).toBeTruthy();
    });

    let company: CompanyEntity;

    it('should have setup stage equal to 2', async () => {
      company = await companyService.findOne({
        where: { slug: companySlug },
      });
      expect(company.setup_stage).toEqual(2);
    });

    it('should show setup complete', () => {
      expect(company.setup_complete).toBeTruthy();
    });
  });
});
