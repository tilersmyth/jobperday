import * as yup from 'yup';

import {
  FindApplicationQuery,
  ApplicationFieldsEnum as Enum,
} from '../../../../../../apollo';

interface FieldSchema {
  [key: string]: yup.ArraySchema<string> | yup.StringSchema<string>;
}

export const dynamicSchema = (
  fields: FindApplicationQuery['findApplication']['fields'],
) => {
  const fieldSchema: FieldSchema = {};

  try {
    for (const field of fields) {
      if ([Enum.Radio, Enum.Text, Enum.Textarea].includes(field.type)) {
        fieldSchema[field.id] = yup.string();
      }

      if ([Enum.Checkbox].includes(field.type)) {
        fieldSchema[field.id] = yup.array().of(yup.string());
      }

      if (field.required) {
        fieldSchema[field.id] = fieldSchema[field.id].required('Required');
      }
    }

    return yup.object().shape(fieldSchema);
  } catch (error) {
    throw error;
  }
};
