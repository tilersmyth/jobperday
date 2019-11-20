import { string, object, array } from 'yup';

import { createApplicationFieldSchema } from './application-field-schema';

export const createApplicationSchema = object().shape({
  title: string().required('Required'),
  fields: array(createApplicationFieldSchema).required('Fields must be added'),
});
