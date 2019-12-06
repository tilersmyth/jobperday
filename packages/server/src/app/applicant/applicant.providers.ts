import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { APPLICANT_TOKEN, APPLICANT_ANSWER_TOKEN } from './applicant.constants';
import { ApplicantEntity, ApplicantAnswerEntity } from './entity';

export const applicantProviders = [
  {
    provide: APPLICANT_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(ApplicantEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: APPLICANT_ANSWER_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(ApplicantAnswerEntity),
    inject: [DB_CON_TOKEN],
  },
];
