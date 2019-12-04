import React, { useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { ApplyModalContent } from './content';
import styles from './style.less';

interface Props {
  applicationId: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const ApplyModal: React.FunctionComponent<Props> = ({
  applicationId,
  ...modalProps
}) => {
  const modalState = useState<ModalProps>({ title: 'Loading', width: 500 });

  return (
    <Modal
      {...modalProps}
      {...modalState[0]}
      maskClosable={false}
      destroyOnClose={true}
      closable={true}
      className={styles.container}
      footer={false}
      onCancel={() => modalProps.setVisible(false)}
    >
      <ApplyModalContent
        modalState={modalState}
        applicationId={applicationId}
      />
    </Modal>
  );
};
