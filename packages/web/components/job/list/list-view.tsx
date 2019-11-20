import React from 'react';
import { useQuery } from 'react-apollo';
import { Button } from 'antd';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../apollo/generated-components';
import { JobsTable } from './table';
import { CompanyPageHeader, CompanyLink } from '../../shared';

export const JobsListView: React.FunctionComponent = () => {
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
        title={'Jobs'}
        extra={[
          <CompanyLink key="create" as={`/jobs/create`} href={`/jobs/create`}>
            <Button type="primary">Create New</Button>
          </CompanyLink>,
        ]}
      />
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <JobsTable companySlug={currentCompany.slug} />
      </div>
    </React.Fragment>
  );
};
