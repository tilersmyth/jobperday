import merge from 'lodash.merge';

import { searchResolvers } from './search';
import { companyResolvers } from './company';
import { postingResolvers } from './postings';
import { companyContactResolvers } from './company-contact';
import { companyProfileResolvers } from './company-profile';

export const resolvers = merge(
  searchResolvers,
  companyResolvers,
  postingResolvers,
  companyContactResolvers,
  companyProfileResolvers,
);
