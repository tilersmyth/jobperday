import React from 'react';
import Router from 'next/router';

import { AuthLayout } from '../auth-layout';
import { LoginView } from '../../shared';
import { LoginViewFooter } from './login-view-footer';
import { LoginMutation } from '../../../apollo';

export const LoginPageView: React.FunctionComponent = () => {
  const loginSuccess = (user: LoginMutation['login']) => {
    Router.push(`/${user.realm}`);
  };

  return (
    <AuthLayout title="Login">
      <LoginView onSuccess={loginSuccess} />
      <LoginViewFooter />
    </AuthLayout>
  );
};
