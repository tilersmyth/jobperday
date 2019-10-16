import merge from 'lodash.merge';

import { searchResolvers } from './search';
import { postingResolvers } from './postings';

export const resolvers = merge(searchResolvers, postingResolvers);
