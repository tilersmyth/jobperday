import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Row, Col, Typography } from 'antd';
import { Formik, Field } from 'formik';

import { AuthLayout } from '../auth-layout';
import { InputField } from '../../shared/input/input-field';
import { RegisterComponent } from '../../../apollo/generated-components';
import { RegisterSchema } from '../../../utils/yup-validation';
import { serverValidationError } from '../../../utils/validation-util';
import { SuccessAlert } from '../../shared/alerts/success-alert';

export const RegisterView: React.FunctionComponent = () => {
  const [verify, setVerify] = useState(false);

  return (
    <AuthLayout title="Register">
      <div>
        {verify && (
          <div style={{ marginBottom: 20 }}>
            <SuccessAlert message="Check your e-mail to confirm your account" />
          </div>
        )}
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors, resetForm }) => {
                try {
                  await register({ variables: data });
                  resetForm();
                  setVerify(true);
                } catch (err) {
                  const errors = serverValidationError(err);
                  return errors && setErrors(errors);
                }
              }}
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={RegisterSchema}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Row gutter={{ md: 16, xs: 0 }}>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                      <Field
                        name="first_name"
                        size="large"
                        placeholder="First name"
                        component={InputField}
                      />
                    </Col>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                      <Field
                        name="last_name"
                        size="large"
                        placeholder="Last name"
                        component={InputField}
                      />
                    </Col>
                  </Row>
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

                  <Field
                    name="confirm_password"
                    type="password"
                    size="large"
                    placeholder="Confirm password"
                    component={InputField}
                  />

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    size="large"
                    block={true}
                  >
                    Register
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
        </RegisterComponent>
      </div>
    </AuthLayout>
  );
};
