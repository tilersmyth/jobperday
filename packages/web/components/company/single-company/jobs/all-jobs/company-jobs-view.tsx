import React, { useState } from 'react';
import { Button } from 'antd';
import { useQuery } from 'react-apollo';

import {
  FindAllJobsComponent,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { JobsNoResultsView } from './jobs-no-results-view';
import { CompanyJobsTable } from './company-jobs-table';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';
import { CompanyLink } from '../../shared';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/jobs', title: 'Jobs' },
];

const CreateJobButton: React.FunctionComponent = () => (
  <CompanyLink as={`/jobs/create`} href={`/jobs/create`}>
    <Button>Create Job</Button>
  </CompanyLink>
);

export const CompanyJobsView: React.FunctionComponent = () => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const [hasJobs, setHasJobs] = useState(false);

  return (
    <CompanyCardContent
      breadcrumbs={breadcrumbRoutes}
      extra={hasJobs && <CreateJobButton />}
    >
      <FindAllJobsComponent variables={{ companySlug: currentCompany.slug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            return <div>error</div>;
          }

          const jobs = data.findAllJobs;

          setHasJobs(jobs.length > 0);

          if (jobs.length === 0) {
            return <JobsNoResultsView companySlug={currentCompany.slug} />;
          }

          return <CompanyJobsTable jobs={jobs} />;
        }}
      </FindAllJobsComponent>
    </CompanyCardContent>
  );
};
