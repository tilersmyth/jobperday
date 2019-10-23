import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps, getIn } from 'formik';
import { applicationFieldOptions } from '@jobperday/common';

const { Option } = Select;

interface InputDetails {
  [key: string]: string;
}

const inputDetails: InputDetails = {
  text: 'single-line answers (char limit: 50)',
  textarea: 'multiline-line answers (char limit: 300)',
  radio: 'select single answer from multiple options',
  checkbox: 'select multiple answers from multiple options',
};

export const SelectApplicationTypeField: React.FunctionComponent<
  FieldProps
> = ({ field, form: { errors, touched, setFieldValue } }) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label="Input Type"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
      extra={inputDetails[field.value]}
    >
      <Select
        onChange={(value: string) => setFieldValue(field.name, value)}
        size="large"
        defaultValue={field.value}
      >
        {applicationFieldOptions.map(type => (
          <Option key={type} value={type.toLowerCase()}>
            {type}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
