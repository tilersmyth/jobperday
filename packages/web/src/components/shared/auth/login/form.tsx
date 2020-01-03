import React from 'react';
import { Button } from 'antd';
import { Field, FormikProps } from 'formik';

import { LoginInput } from '../../../../apollo';
import { InputField } from '../../input/input-field';

export const LoginForm: React.FunctionComponent<FormikProps<LoginInput>> = ({
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        size="large"
        placeholder="E-mail"
        component={InputField}
      />
      <Field
        name="password"
        type="password"
        size="large"
        placeholder="Password"
        component={InputField}
      />
      <Button type="primary" htmlType="submit" size="large" block={true}>
        Login
      </Button>
    </form>
  );
};
