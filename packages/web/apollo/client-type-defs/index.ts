import merge from 'lodash.merge';

import { companyTypeDef } from './company';
import { postingTypeDef } from './posting';
import { companyContactTypeDef } from './company-contact';
import { companyProfileTypeDef } from './company-profile';

export const typeDefs = merge(
  companyTypeDef,
  postingTypeDef,
  companyContactTypeDef,
  companyProfileTypeDef,
);
