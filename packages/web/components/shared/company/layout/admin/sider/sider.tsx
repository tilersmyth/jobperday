import React from 'react';
import { useQuery } from 'react-apollo';
import { Layout } from 'antd';

import {
  FindCompanyQuery,
  FindCompanyProfileDocument,
  FindCompanyProfileQuery,
} from '../../../../../../apollo';
import { SiderBrand } from './brand';
import styles from './style.less';

const { Sider } = Layout;

interface Props {
  company: FindCompanyQuery['findCompany'];
  children: any;
}

export const CompanySider: React.FunctionComponent<Props> = ({
  company,
  children,
}) => {
  const { data, error } = useQuery<FindCompanyProfileQuery>(
    FindCompanyProfileDocument,
    {
      variables: { companySlug: company.slug },
    },
  );

  if (error || !data) {
    return <div>Error loading company profile</div>;
  }

  const profile = data.findCompanyProfile;

  return (
    <Sider width={300} className={styles.container}>
      <SiderBrand name={company.name} profile={profile} />
      {children}
    </Sider>
  );
};
