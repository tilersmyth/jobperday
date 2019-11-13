import React from 'react';
import { useQuery } from 'react-apollo';
import { Card, Avatar, Spin } from 'antd';

import {
  FindCompanyQuery,
  FindCompanyProfileDocument,
  FindCompanyProfileQuery,
} from '../../../../../../apollo';
import './style.less';

interface Props {
  company: FindCompanyQuery['findCompany'];
  children: any;
}

export const CompanySidebar: React.FunctionComponent<Props> = ({
  company,
  children,
}) => {
  const { loading, data, error } = useQuery<FindCompanyProfileQuery>(
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
    <Card className="company_sidebar" bordered={false}>
      <Card.Meta
        avatar={
          loading ? (
            <Spin />
          ) : (
            <Avatar src={profile ? profile.profile_image : ''} />
          )
        }
        title={company.name}
      />
      {children}
    </Card>
  );
};
