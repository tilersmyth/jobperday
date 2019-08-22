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
import { CompanyEntity } from '../src/app/company/entity';
import { TestSeedService } from './seed.service';
import { JobModule } from '../src/app/job/job.module';
import { CompanyModule } from '../src/app/company/company.module';

describe('JobResolver', async () => {
  let app: INestApplication;

  let accessToken: string;
  let company: CompanyEntity;
  let jobId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [TestSeedService],
      imports: [
        JobModule,
        CompanyModule,
        AuthModule,
        UserModule,
        SecurityModule,
        GraphQLModule.forRootAsync({
          useClass: GqlConfigService,
        }),
      ],
    }).compile();

    // Seed test
    const seedService = moduleFixture.get<TestSeedService>(TestSeedService);
    await seedService.company();
    accessToken = seedService.accessToken;
    company = seedService.testCompany;

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create Job', async () => {
    it('should create job', async () => {
      const input = {
        companySlug: company.slug,
        job: {
          name: faker.lorem.word(),
          category: faker.lorem.word(),
          summary: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
        },
      };

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input },
          query: `mutation CreateJob($input: CreateJobInput!){
            createJob(input:$input){
              id
              name
            }
          }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

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

      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: { input },
          query: `mutation AddJobInstance($input: AddJobInstanceInput!){
            addJobInstance(input:$input)
          }`,
        })
        .set('Authorization', `Bearer ${accessToken}`);

      const instance = body.data.addJobInstance;

      expect(instance).toBeTruthy();
    });
  });
});
