import React from 'react';
import { Input } from 'antd';
import { FieldProps } from 'formik';

const { TextArea } = Input;

export const JobSummaryInput: React.FunctionComponent<FieldProps> = ({
  field,
}) => {
  return <TextArea {...field} />;
};
