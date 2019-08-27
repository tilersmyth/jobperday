import React from 'react';
import Link from 'next/link';
import { Button, Typography } from 'antd';
import { Formik, Field } from 'formik';

import { AuthLayout } from '../auth-layout';
import { InputField } from '../../shared/input/input-field';
import { ForgotPasswordComponent } from '../../../apollo/generated-components';
import { ForgotPasswordSchema } from '../../../utils/yup-validation';

export const ForgotPasswordView: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Forgot Password">
      <div>
        <ForgotPasswordComponent>
          {forgotPassword => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async data => {
                try {
                  await forgotPassword({ variables: data });
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={{
                email: '',
              }}
              validationSchema={ForgotPasswordSchema}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    size="large"
                    placeholder="E-mail"
                    component={InputField}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    size="large"
                    block={true}
                  >
                    Send
                  </Button>
                  <div style={{ marginTop: 10 }}>
                    <Link href="/login">
                      <a>
                        <Typography.Text type="secondary">
                          Click here to login
                        </Typography.Text>
                      </a>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </ForgotPasswordComponent>
      </div>
    </AuthLayout>
  );
};
