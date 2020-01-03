import React from 'react';
import { PageHeader } from 'antd';
import { useQuery } from 'react-apollo';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../../../apollo/generated-components';
import { Icon } from '../../../../icon';
import styles from './style.less';

interface Props {
  openDrawer: (value: boolean) => void;
}

export const CompanyNavbar: React.FunctionComponent<Props> = ({
  openDrawer,
}) => {
  const { loading, data, error } = useQuery<CurrentCompanyQuery>(
    CurrentCompanyDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentCompany } = data;

  return (
    <PageHeader
      className={styles.container}
      avatar={{
        src:
          'https://pbs.twimg.com/profile_images/517308223716487168/FBTn9ivB_400x400.png',
      }}
      title={currentCompany.name}
      backIcon={<Icon type="menu-line" />}
      onBack={() => openDrawer(true)}
    />
  );
};
