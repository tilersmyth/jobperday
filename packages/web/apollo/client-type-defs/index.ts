import merge from 'lodash.merge';

import { testTypeDef } from './test';
import { companyTypeDef } from './company';
import { postingTypeDef } from './posting';

export const typeDefs = merge(testTypeDef, companyTypeDef, postingTypeDef);
