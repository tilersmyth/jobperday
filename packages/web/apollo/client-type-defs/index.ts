import merge from 'lodash.merge';

import { testTypeDef } from './test';
import { postingTypeDef } from './posting';

export const typeDefs = merge(testTypeDef, postingTypeDef);
