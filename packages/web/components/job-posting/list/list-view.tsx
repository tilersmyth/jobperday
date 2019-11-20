import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button } from 'antd';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../apollo/generated-components';
import { JobPostingsTable } from './table';
import { CompanyPageHeader } from '../../shared';
import { CreatePostingModal } from '../create';

export const JobPostingsListView: React.FunctionComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <JobPostingsTable companySlug={currentCompany.slug} />
      </div>

      <CreatePostingModal visible={modalVisible} setVisible={setModalVisible} />
    </React.Fragment>
  );
};
