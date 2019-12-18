import * as React from 'react';
import { Layout, Icon } from 'antd';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';

import {
  CurrentUserDocument,
  CurrentUserQuery,
  LogoutDocument,
  LogoutMutation,
} from '../../../../../apollo/generated-components';
import styles from './style.less';
import { CandidateHeaderMenu } from './menu';

interface Props {
  openDrawer?: (value: boolean) => void;
}

export const CandidateHeader: React.SFC<Props> = ({ openDrawer }) => {
  const client = useApolloClient();
  const [logout] = useMutation<LogoutMutation>(LogoutDocument);
  const { loading, data, error } = useQuery<CurrentUserQuery>(
    CurrentUserDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentUser } = data;

  const handleLogout = async () => {
    logout({
      async update(cache, { data: logoutData }) {
        if (!logoutData || !logoutData.logout) {
          console.log('error logging out');
          return;
        }

        cache.writeQuery({
          query: CurrentUserDocument,
          data: { currentUser: null },
        });

        await client.clearStore();
      },
    });
  };

  return (
    <Layout.Header className={styles.headerContainer}>
      <div className={styles.headerBrand}>
        {openDrawer && (
          <div className={styles.menuIcon}>
            <Icon type="menu" onClick={() => openDrawer(true)} />
          </div>
        )}
        <div className={styles.brandPlaceholder} />
      </div>
      <CandidateHeaderMenu user={currentUser} logout={handleLogout} />
    </Layout.Header>
  );
};
