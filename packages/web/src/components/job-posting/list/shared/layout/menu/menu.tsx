import React from 'react';
import { useQuery } from 'react-apollo';
import { Menu, Badge, Button } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import { CompanyPageMenu } from '../../../../../shared';
import {
  PostingCountDocument,
  PostingCountQuery,
} from '../../../../../../apollo';
import styles from './style.less';

interface Props {
  companySlug: string;
  tabKey: string;
  tabChange: (param: ClickParam) => void;
  setModalVisible: (value: boolean) => void;
}

export const LayoutMenu: React.FunctionComponent<Props> = ({
  companySlug,
  tabKey,
  tabChange,
  setModalVisible,
}) => {
  const { error, loading, data } = useQuery<PostingCountQuery>(
    PostingCountDocument,
    {
      variables: { companySlug },
    },
  );

  if (error || !data) {
    return null;
  }

  const { postingCount } = data;

  return (
    <CompanyPageMenu
      onClick={tabChange}
      selectedKeys={[tabKey]}
      mode="horizontal"
      extra={
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Post Job
        </Button>
      }
    >
      <Menu.Item key="open">
        Open{' '}
        <Badge className={styles.badge} count={!loading && postingCount.open} />
      </Menu.Item>
      <Menu.Item key="closed">
        Closed{' '}
        <Badge
          className={styles.badge}
          count={!loading && postingCount.closed}
        />
      </Menu.Item>
    </CompanyPageMenu>
  );
};
