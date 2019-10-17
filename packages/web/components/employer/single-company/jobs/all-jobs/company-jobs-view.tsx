import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

import { FindAllJobsComponent } from '../../../../../apollo/generated-components';
import { JobsNoResultsView } from './jobs-no-results-view';
import { CompanyJobsTable } from './company-jobs-table';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';

interface Props {
  companySlug: string;
}

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/jobs', title: 'Jobs' },
];

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
    <CompanyCardContent
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
    </CompanyCardContent>
  );
};
