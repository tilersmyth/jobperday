import merge from 'lodash.merge';

import { companyResolvers } from './company';
import { searchResolvers } from './search';
import { postingResolvers } from './postings';
import { companyContactResolvers } from './company-contact';
import { companyProfileResolvers } from './company-profile';
import { uiResolvers } from './ui';

export const resolvers = merge(
  companyResolvers,
  searchResolvers,
  postingResolvers,
  companyContactResolvers,
  companyProfileResolvers,
  uiResolvers,
);
