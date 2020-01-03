import merge from 'lodash.merge';

import { userTypeDef } from './user';
import { companyTypeDef } from './company';
import { postingTypeDef } from './posting';
import { companyContactTypeDef } from './company-contact';
import { companyProfileTypeDef } from './company-profile';
import { jobTypeDef } from './job';
import { uiTypeDef } from './ui';

export const typeDefs = merge(
  userTypeDef,
  companyTypeDef,
  postingTypeDef,
  companyContactTypeDef,
  companyProfileTypeDef,
  jobTypeDef,
  uiTypeDef,
);
