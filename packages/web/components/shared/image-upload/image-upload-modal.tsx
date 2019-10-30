import React, { useState } from 'react';
import { Modal, Button, Tabs, Icon } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { useQuery } from 'react-apollo';

import { ImageLibrary } from './image-library';
import { ImageUpload } from './image-upload/image-upload';
import {
  CurrentCompanyDocument,
  UploadImageMutation,
} from '../../../apollo/generated-components';
import './style.less';

const { TabPane } = Tabs;

interface Props extends ModalProps {
  multiple: boolean;
  onSelect: (images: Array<UploadImageMutation['uploadImage']>) => void;
}

export const ImageUploadModal: React.FunctionComponent<Props> = ({
  multiple,
  onSelect,
  ...modalProps
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const [currentTab, setCurrentTab] = useState('1');

  return (
    <Modal
      width={800}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={modalProps.onOk}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={modalProps.onOk}
          disabled={true}
        >
          Continue
        </Button>,
      ]}
      className="image-upload-modal"
      {...modalProps}
    >
      <Tabs activeKey={currentTab} onChange={key => setCurrentTab(key)}>
        <TabPane
          tab={
            <span>
              <Icon type="upload" />
              Image Upload
            </span>
          }
          key="1"
        >
          <ImageUpload
            multiple={multiple}
            companySlug={currentCompany.slug}
            selected={onSelect}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="picture" />
              Image Library
            </span>
          }
          key="2"
        >
          <ImageLibrary setTab={setCurrentTab} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
