import { string, object, boolean, array } from 'yup';
import { applicationFieldOptions } from '@jobperday/common';

export const createApplicationFieldSchema = object()
  .shape({
    type: string()
      .required('Required')
      .oneOf(applicationFieldOptions),
    question: string().required('Required'),
    required: boolean().required('Required'),
    options: array().of(string()),
  })
  .test('options-field', 'required', function({ type, options }) {
    if (!['radio', 'checkbox'].includes(type)) {
      return true;
    }

    if (options.length < 2) {
      return this.createError({
        path: 'options',
        message: `${type} requires at least 2 options`,
      });
    }

    const emptyOptions = options.findIndex(
      (option: string) => option.trim() === '',
    );

    if (emptyOptions > -1) {
      return this.createError({
        path: 'options',
        message: 'All options require a value',
      });
    }

    return true;
  });
