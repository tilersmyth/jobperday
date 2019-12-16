import merge from 'lodash.merge';

import { companyResolvers } from './company';
import { postingResolvers } from './postings';
import { companyContactResolvers } from './company-contact';
import { companyProfileResolvers } from './company-profile';
import { uiResolvers } from './ui';
import { userResolvers } from './user';

export const resolvers = merge(
  companyResolvers,
  postingResolvers,
  companyContactResolvers,
  companyProfileResolvers,
  uiResolvers,
  userResolvers,
);
