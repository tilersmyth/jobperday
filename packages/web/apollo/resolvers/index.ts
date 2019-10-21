import merge from 'lodash.merge';

import { searchResolvers } from './search';
import { companyResolvers } from './company';
import { postingResolvers } from './postings';

export const resolvers = merge(
  searchResolvers,
  companyResolvers,
  postingResolvers,
);
