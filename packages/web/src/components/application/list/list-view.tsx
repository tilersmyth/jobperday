import React from 'react';
import { useQuery } from 'react-apollo';
import { Button } from 'antd';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../apollo/generated-components';
import { ApplicationsTable } from './table';
import { CompanyPageHeader, CompanyLink } from '../../shared';

export const ApplicationsListView: React.FunctionComponent = () => {
  const { loading, data, error } = useQuery<CurrentCompanyQuery>(
    CurrentCompanyDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentCompany } = data;

  if (loading) {
    return null;
  }

  return (
    <React.Fragment>
      <CompanyPageHeader
        style={{ marginBottom: 20 }}
        title={'Applications'}
        extra={[
          <CompanyLink
            key="create"
            as={`/applications/create`}
            href={`/applications/create`}
          >
            <Button type="primary">Add Application</Button>
          </CompanyLink>,
        ]}
      />
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <ApplicationsTable companySlug={currentCompany.slug} />
      </div>
    </React.Fragment>
  );
};
