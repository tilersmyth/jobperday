import React, { useState } from 'react';
import { Modal, Button, Tabs, Icon } from 'antd';
import { useQuery } from 'react-apollo';

import { ImageLibrary } from './image-library';
import { ImageUpload } from './image-upload/image-upload';
import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../apollo/generated-components';
import styles from './style.less';

const { TabPane } = Tabs;

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  multiple: boolean;
  onSelect: (images: string[]) => void;
}

export const ImageUploadModal: React.FunctionComponent<Props> = ({
  visible,
  setVisible,
  multiple,
  onSelect,
}) => {
  const { loading, data, error } = useQuery<CurrentCompanyQuery>(
    CurrentCompanyDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentCompany } = data;

  const [currentTab, setCurrentTab] = useState('1');
  const [selection, setSelection] = useState<string[]>([]);

  const onImageSelect = (path: string) => {
    const index = selection.indexOf(path);
    if (index > -1) {
      selection.splice(index, 1);
      setSelection([...selection]);
      return;
    }

    setSelection(multiple ? [...selection, path] : [path]);
  };

  return (
    <Modal
      visible={visible}
      width={800}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="continue"
          type="primary"
          onClick={() => {
            onSelect(selection);
            setVisible(false);
          }}
          disabled={selection.length < 1}
        >
          Continue
        </Button>,
      ]}
      className={styles.container}
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
            setVisible={setVisible}
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
          <ImageLibrary
            setTab={setCurrentTab}
            companySlug={currentCompany.slug}
            onSelect={onImageSelect}
            selected={selection}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
