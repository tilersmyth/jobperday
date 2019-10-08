import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps, getIn } from 'formik';

const { Option } = Select;

const tempTypeOptions: string[] = [
  'Labor',
  'Cooking',
  'Forestry',
  'Event Detail',
  'Sign Spinner',
  'Recorder',
  'Cleaning',
];

export const SelectJobTypeField: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label="Type"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <Select
        onChange={(value: string) => setFieldValue(field.name, value)}
        size="large"
        showSearch={true}
        placeholder="Select job type"
        optionFilterProp="children"
        filterOption={(input, { props }) => {
          const { value } = props;

          if (!value) {
            return false;
          }

          return (value as string).includes(input.toLowerCase());
        }}
      >
        {tempTypeOptions.map(type => (
          <Option key={type} value={type.toLowerCase()}>
            {type}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
