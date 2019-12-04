import React, { useEffect } from 'react';
import { ModalProps } from 'antd/lib/modal';
import { useQuery } from 'react-apollo';

import {
  FindApplicationDocument,
  FindApplicationQuery,
} from '../../../../../apollo';
import { LoaderMask } from '../../../loader';
import { ApplicationFormView } from './form';
import styles from './style.less';

interface Props {
  applicationId: string;
  modalState: [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>];
}

export const ApplyModalApplication: React.FunctionComponent<Props> = ({
  applicationId,
  modalState,
}) => {
  const { loading, error, data } = useQuery<FindApplicationQuery>(
    FindApplicationDocument,
    {
      variables: { id: applicationId },
    },
  );

  if (error || !data) {
    throw Error('Find application failed');
  }

  useEffect(() => {
    if (loading) {
      modalState[1]({ title: 'Loading Application', width: 800 });
      return;
    }

    modalState[1]({
      title: data.findApplication && data.findApplication.title,
      width: 800,
    });
  }, [data.findApplication]);

  return (
    <div className={styles.container}>
      {loading && <LoaderMask />}
      {!loading && (
        <ApplicationFormView
          fields={data.findApplication && data.findApplication.fields}
        />
      )}
    </div>
  );
};
