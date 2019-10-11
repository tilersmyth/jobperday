import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { JobsLayout } from '../../jobs/shared/layout/jobs-layout';

import { FindCurrentPostingsComponent } from '../../../../../apollo/generated-components';
import { JobsBreadcrumb } from '../../jobs/shared/jobs-breadcrumb';
import { PostingsNoResultsView } from './postings-no-results-view';
import { CreatePostingModal } from '../create-posting/create-posting-modal';

interface Props {
  companySlug: string;
}

const breadcrumbRoutes: JobsBreadcrumb[] = [{ path: '/', title: 'Postings' }];

export const CompanyPostingsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const [hasPostings, setHasPostings] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <JobsLayout
        breadcrumbs={breadcrumbRoutes}
        companySlug={companySlug}
        extra={
          hasPostings && (
            <Button onClick={() => setModalVisible(true)}>Create Job</Button>
          )
        }
      >
        <FindCurrentPostingsComponent variables={{ companySlug }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>loading...</div>;
            }

            if (error || !data) {
              return <div>error</div>;
            }

            const postings = data.findCurrentPostings;

            useEffect(() => {
              setHasPostings(postings.length > 0);
            }, [postings]);

            if (postings.length === 0) {
              return (
                <PostingsNoResultsView
                  companySlug={companySlug}
                  openModal={setModalVisible}
                />
              );
            }

            console.log(postings);

            return <div>has postings</div>;
          }}
        </FindCurrentPostingsComponent>
      </JobsLayout>
      <CreatePostingModal
        companySlug={companySlug}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
      />
    </React.Fragment>
  );
};
