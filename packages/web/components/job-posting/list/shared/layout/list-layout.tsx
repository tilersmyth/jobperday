import React, { useState, ReactNode } from 'react';
import { ClickParam } from 'antd/lib/menu';
import Router from 'next/router';

import { CreatePostingModal } from '../../../create';
import { LayoutMenu } from './menu';

interface Props {
  companySlug: string;
  tabKey: string;
  children: ReactNode;
}

export const PostingListLayout: React.FunctionComponent<Props> = ({
  companySlug,
  tabKey,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const tabChange = async ({ key }: ClickParam) => {
    const route = key === 'open' ? '' : key;
    await Router.push(
      `/employer/[company-slug]/postings/${route}`,
      `/employer/${companySlug}/postings/${route}`,
    );
  };

  return (
    <React.Fragment>
      <LayoutMenu
        companySlug={companySlug}
        tabKey={tabKey}
        tabChange={tabChange}
        setModalVisible={setModalVisible}
      />
      {children}
      <CreatePostingModal visible={modalVisible} setVisible={setModalVisible} />
    </React.Fragment>
  );
};
