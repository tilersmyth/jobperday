import * as yup from 'yup';

import { FindApplicationQuery } from '../../../../../../apollo';

interface FieldSchema {
  [key: string]: yup.ArraySchema<string> | yup.StringSchema<string>;
}

export const dynamicSchema = (
  fields: FindApplicationQuery['findApplication']['fields'],
) => {
  const fieldSchema: FieldSchema = {};

  try {
    for (const field of fields) {
      fieldSchema[field.id] = yup.string();

      if (field.required) {
        fieldSchema[field.id] = fieldSchema[field.id].required('Required');
      }
    }

    return yup.object().shape(fieldSchema);
  } catch (error) {
    throw error;
  }
};
