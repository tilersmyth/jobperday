import React from 'react';
import { PageHeader, Icon } from 'antd';
import { useQuery } from 'react-apollo';

import './style.less';
import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../../../apollo/generated-components';

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
      className="company_navbar"
      avatar={{
        src:
          'https://pbs.twimg.com/profile_images/517308223716487168/FBTn9ivB_400x400.png',
      }}
      title={currentCompany.name}
      backIcon={<Icon type="menu" />}
      onBack={() => openDrawer(true)}
    />
  );
};
