import React, { useState } from 'react';
import { Formik } from 'formik';
import { useMutation, useApolloClient } from 'react-apollo';

import {
  LoginDocument,
  LoginMutation,
  CurrentUserDocument,
  CurrentUserQuery,
} from '../../../../apollo';
import { ErrorAlert } from '../../alerts/error-alert';
import { serverValidationError } from '../../../../utils/validation-util';
import { LoginSchema } from './validation-schema';
import { LoginForm } from './form';

interface Props {
  onSuccess: (user: LoginMutation['login']) => void;
}

export const LoginView: React.FunctionComponent<Props> = ({ onSuccess }) => {
  const client = useApolloClient();
  const [login] = useMutation<LoginMutation>(LoginDocument);
  const [error, setError] = useState('');

  return (
    <div>
      {error && (
        <div style={{ marginBottom: 20 }}>
          <ErrorAlert message="Dang it, that email and/or password is incorrect." />
        </div>
      )}

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async input => {
          try {
            setError('');
            await login({
              variables: { input },
              async update(cache, { data }) {
                if (!data) {
                  console.log('error adding user to cache');
                  return;
                }

                await client.clearStore();

                cache.writeQuery<CurrentUserQuery>({
                  query: CurrentUserDocument,
                  data: { currentUser: data.login },
                });

                onSuccess(data.login);
              },
            });
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
        {formikProps => <LoginForm {...formikProps} />}
      </Formik>
    </div>
  );
};
