// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();

import faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UserModule } from '../src/app/user/user.module';
import { AuthModule } from '../src/app/auth/auth.module';
import { CompanyEntity } from '../src/app/company/entity';
import { TestSeedService } from './services/seed.service';
import { JobModule } from '../src/app/job/job.module';
import { CompanyModule } from '../src/app/company/company.module';
import { TestModule } from './test.module';
import { TestUtilsService, GqlReqUtil } from './services';

describe('JobResolver', async () => {
  let app: INestApplication;
  let gqlReq: GqlReqUtil;
  let testUtils: TestUtilsService;

  let company: CompanyEntity;
  let jobId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [TestSeedService],
      imports: [TestModule, JobModule, CompanyModule, AuthModule, UserModule],
    }).compile();

    // Clean DB
    testUtils = moduleFixture.get<TestUtilsService>(TestUtilsService);
    await testUtils.reloadFixtures();

    // Seed test DB
    const seedService = moduleFixture.get<TestSeedService>(TestSeedService);
    await seedService.company();
    company = seedService.testCompany;

    app = moduleFixture.createNestApplication();
    gqlReq = new GqlReqUtil(app);
    gqlReq.token = seedService.accessToken;
    await app.init();
  });

  afterAll(async () => {
    await testUtils.closeDbConnection();
    await app.close();
  });

  describe('Create Job', async () => {
    it('should create job', async () => {
      const input = {
        companySlug: company.slug,
        job: {
          name: faker.name.jobType(),
          category: faker.commerce.department(),
          summary: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
        },
      };

      const { body } = await gqlReq.send(
        `mutation CreateJob($input: CreateJobInput!){
            createJob(input:$input){
              id
              name
            }
          }`,
        { input },
      );

      const job = body.data.createJob;
      jobId = job.id;

      expect(job.name).toEqual(input.job.name);
    });
  });

  describe('Add Job Instance', async () => {
    it('should add job instance', async () => {
      const input = {
        companySlug: company.slug,
        jobId,
        instance: {
          date: faker.date.future(1),
          start_time: '08:00AM',
          end_time: '05:00PM',
          pay_rate: faker.commerce.price(10, 20),
          total_openings: faker.random.number(10),
          apply_deadline: faker.date.future(1),
        },
      };

      const { body } = await gqlReq.send(
        `mutation AddJobInstance($input: AddJobInstanceInput!){
            addJobInstance(input:$input)
          }`,
        { input },
      );

      const instance = body.data.addJobInstance;

      expect(instance).toBeTruthy();
    });
  });
});
