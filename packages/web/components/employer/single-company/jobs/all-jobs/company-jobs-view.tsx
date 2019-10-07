import React from 'react';
import { Card } from 'antd';

import { FindAllJobsComponent } from '../../../../../apollo/generated-components';
import { JobsNoResultsView } from './jobs-no-results-view';

interface Props {
  companySlug: string;
}

export const CompanyJobsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  return (
    <Card bordered={false}>
      <FindAllJobsComponent variables={{ companySlug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            return <div>error</div>;
          }

          const jobs = data.findAllJobs;

          if (jobs.length === 0) {
            return <JobsNoResultsView />;
          }

          return (
            <React.Fragment>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </React.Fragment>
          );
        }}
      </FindAllJobsComponent>
    </Card>
  );
};
