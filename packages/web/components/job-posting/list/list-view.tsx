import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { CompanyPageHeader } from '../../shared';
import { CreatePostingModal } from '../create';
import styles from './style.less';

const CurrentList = dynamic({
  loader: async () => {
    const { CurrentPostingListView } = await import('./current');
    return CurrentPostingListView;
  },
});

const ExpiredList = dynamic({
  loader: async () => {
    const { ExpiredPostingListView } = await import('./expired');
    return ExpiredPostingListView;
  },
});

interface Props {
  companySlug: string;
  tabKey: string;
}

export const PostingListView: React.FunctionComponent<Props> = ({
  companySlug,
  tabKey,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const tabChange = async (route: string) => {
    await Router.push(
      `/employer/[company-slug]/postings/${route}`,
      `/employer/${companySlug}/postings/${route}`,
    );
  };

  return (
    <React.Fragment>
      <CompanyPageHeader
        className={styles.header}
        title={'Job Postings'}
        extra={[
          <Button
            key="create"
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            Create New
          </Button>,
        ]}
      />
      <Tabs
        defaultActiveKey={tabKey}
        onChange={tabChange}
        className={styles.tabs}
        animated={false}
      >
        <Tabs.TabPane tab="Current" key="">
          <CurrentList companySlug={companySlug} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Expired" key="expired">
          <ExpiredList companySlug={companySlug} />
        </Tabs.TabPane>
      </Tabs>
      <CreatePostingModal visible={modalVisible} setVisible={setModalVisible} />
    </React.Fragment>
  );
};
