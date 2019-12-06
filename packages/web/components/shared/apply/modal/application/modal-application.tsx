import React, { useEffect } from 'react';
import { ModalProps } from 'antd/lib/modal';
import { useQuery } from 'react-apollo';

import {
  FindApplicationDocument,
  FindApplicationQuery,
  SearchFindPostingQuery,
} from '../../../../../apollo';
import { LoaderMask } from '../../../loader';
import { ApplicationFormView } from './form';
import styles from './style.less';

interface Props {
  posting: SearchFindPostingQuery['searchFindPosting'];
  modalState: [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>];
}

export const ApplyModalApplication: React.FunctionComponent<Props> = ({
  posting,
  modalState,
}) => {
  const { loading, error, data } = useQuery<FindApplicationQuery>(
    FindApplicationDocument,
    {
      variables: { id: posting.applicationId },
    },
  );

  if (error || !data) {
    throw Error('Find application failed');
  }

  useEffect(() => {
    if (loading) {
      modalState[1]({ title: 'Loading Application' });
      return;
    }

    modalState[1]({
      title: data.findApplication && data.findApplication.title,
      width: 800,
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    });
  }, [data.findApplication]);

  return (
    <div className={styles.container}>
      {loading && <LoaderMask />}
      {!loading && (
        <ApplicationFormView
          modalState={modalState}
          posting={posting}
          fields={data.findApplication && data.findApplication.fields}
        />
      )}
    </div>
  );
};
