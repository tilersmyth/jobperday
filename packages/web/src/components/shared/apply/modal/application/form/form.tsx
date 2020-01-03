import React from 'react';
import { Form, Button } from 'antd';
import { Field, FormikProps } from 'formik';

import {
  FindApplicationQuery,
  ApplicationFieldsEnum,
} from '../../../../../../apollo';
import { TextInput, RadioInput, CheckboxInput, TextareaInput } from './inputs';

interface Props extends FormikProps<{ [key: string]: string }> {
  fields: FindApplicationQuery['findApplication']['fields'];
}

const fieldInput = (type: ApplicationFieldsEnum) => {
  switch (type) {
    case ApplicationFieldsEnum.Text:
      return TextInput;
    case ApplicationFieldsEnum.Radio:
      return RadioInput;
    case ApplicationFieldsEnum.Checkbox:
      return CheckboxInput;
    case ApplicationFieldsEnum.Textarea:
      return TextareaInput;
    default:
      throw Error('Unrecognized application input type');
  }
};

export const ApplicationForm: React.FunctionComponent<Props> = ({
  fields,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit} colon={false}>
      {fields.map((field, i) => (
        <div key={field.id}>
          <strong>
            {i + 1}. {field.question}
          </strong>
          <Field
            name={field.id}
            size="large"
            options={field.options}
            component={fieldInput(field.type)}
          />
        </div>
      ))}

      <Button type="primary" htmlType="submit" size="large">
        Submit
      </Button>
    </Form>
  );
};
