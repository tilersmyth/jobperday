import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

import { FindAllJobsComponent } from '../../../../../apollo/generated-components';
import { JobsNoResultsView } from './jobs-no-results-view';
import { JobsBreadcrumb } from '../shared/jobs-breadcrumb';
import { JobsLayout } from '../shared/layout/jobs-layout';
import { CompanyJobsTable } from './company-jobs-table';

interface Props {
  companySlug: string;
}

const breadcrumbRoutes: JobsBreadcrumb[] = [{ path: '/', title: 'Jobs' }];

const CreateJobButton: React.FunctionComponent<Props> = ({ companySlug }) => (
  <Link href={`/employer/${companySlug}/jobs/create`}>
    <a>
      <Button>Create Job</Button>
    </a>
  </Link>
);

export const CompanyJobsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const [hasJobs, setHasJobs] = useState(false);

  return (
    <JobsLayout
      breadcrumbs={breadcrumbRoutes}
      companySlug={companySlug}
      extra={hasJobs && <CreateJobButton companySlug={companySlug} />}
    >
      <FindAllJobsComponent variables={{ companySlug }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            return <div>error</div>;
          }

          const jobs = data.findAllJobs;

          useEffect(() => {
            setHasJobs(jobs.length > 0);
          }, [jobs]);

          if (jobs.length === 0) {
            return <JobsNoResultsView companySlug={companySlug} />;
          }

          console.log(jobs);

          return <CompanyJobsTable jobs={jobs} />;
        }}
      </FindAllJobsComponent>
    </JobsLayout>
  );
};
