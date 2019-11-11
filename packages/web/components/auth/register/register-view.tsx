import React from 'react';
import Link from 'next/link';
import { Button, Row, Col, Typography } from 'antd';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import { AuthLayout } from '../auth-layout';
import { InputField } from '../../shared/input/input-field';
import {
  RegisterComponent,
  MeDocument,
} from '../../../apollo/generated-components';
import { RegisterSchema } from '../../../utils/yup-validation';
import { serverValidationError } from '../../../utils/validation-util';

export const RegisterView: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Register">
      <div>
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (variables, { setErrors }) => {
                try {
                  const user = await register({
                    variables,
                    update(cache, { data }) {
                      if (data) {
                        cache.writeQuery({
                          query: MeDocument,
                          data: { me: data.register },
                        });
                      }
                    },
                  });

                  if (!user || !user.data || !user.data.register) {
                    Router.push('/error');
                    return;
                  }

                  Router.push(`/${user.data.register.realm}`);
                } catch (err) {
                  const errors = serverValidationError(err);
                  console.log(errors);
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
