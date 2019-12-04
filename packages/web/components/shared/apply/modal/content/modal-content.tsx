import React from 'react';
import { useQuery } from 'react-apollo';
import dynamic from 'next/dynamic';
import { ModalProps } from 'antd/lib/modal';

import { CurrentUserQuery, CurrentUserDocument } from '../../../../../apollo';

const LoginComponent = dynamic({
  loader: async () => {
    const { ApplyModalLogin } = await import('../login');
    return ApplyModalLogin;
  },
});

const ApplicationComponent = dynamic({
  loader: async () => {
    const { ApplyModalApplication } = await import('../application');
    return ApplyModalApplication;
  },
});

interface Props {
  applicationId: string;
  modalState: [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>];
}

export const ApplyModalContent: React.FunctionComponent<Props> = ({
  applicationId,
  modalState,
}) => {
  const { loading, data, error } = useQuery<CurrentUserQuery>(
    CurrentUserDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  if (!data.currentUser) {
    return <LoginComponent modalState={modalState} />;
  }

  // to do
  // need to check that user is setup here

  return (
    <ApplicationComponent
      modalState={modalState}
      applicationId={applicationId}
    />
  );
};
