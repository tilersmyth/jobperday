import React, { useEffect } from 'react';
import { ModalProps } from 'antd/lib/modal';

import { LoginView } from '../../../auth';
import { LoginMutation } from '../../../../../apollo';

interface Props {
  modalState: [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>];
}

export const ApplyModalLogin: React.FunctionComponent<Props> = ({
  modalState,
}) => {
  const loginSuccess = (user: LoginMutation['login']) => {
    console.log(user);
  };

  useEffect(() => {
    modalState[1]({ title: 'Login Required', width: 500 });
  }, []);

  return <LoginView onSuccess={loginSuccess} />;
};
