import React from 'react';
import { Select } from 'antd';
import { FieldProps } from 'formik';

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

export const SelectJobTypeInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
}) => {
  return (
    <Select
      value={field.value ? field.value : undefined}
      onChange={(value: string) => setFieldValue(field.name, value)}
      size="large"
      showSearch={true}
      placeholder="Select type"
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
  );
};
