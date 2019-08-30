import React, { useState } from 'react';
import { Button } from 'antd';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import { AuthLayout } from '../auth-layout';
import { LoginComponent } from '../../../apollo/generated-components';
import { LoginSchema } from '../../../utils/yup-validation';
import { InputField } from '../../shared/input/input-field';
import { serverValidationError } from '../../../utils/validation-util';
import { ErrorAlert } from '../../shared/alerts/error-alert';
import { LoginViewFooter } from './login-view-footer';

export const LoginView: React.FunctionComponent = () => {
  const [error, setError] = useState('');

  return (
    <AuthLayout title="Login">
      <div>
        {error && (
          <div style={{ marginBottom: 20 }}>
            <ErrorAlert message="Dang it, that email and/or password is incorrect." />
          </div>
        )}
        <LoginComponent>
          {login => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async data => {
                try {
                  setError('');
                  await login({ variables: data });
                  Router.push('/admin');
                } catch (err) {
                  const errors = serverValidationError(err);
                  return errors && setError(errors.message);
                }
              }}
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
            >
              {({ handleSubmit }) => (
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    size="large"
                    block={true}
                  >
                    Login
                  </Button>
                  <LoginViewFooter />
                </form>
              )}
            </Formik>
          )}
        </LoginComponent>
      </div>
    </AuthLayout>
  );
};
