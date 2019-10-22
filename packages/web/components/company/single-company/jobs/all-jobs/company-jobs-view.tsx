import React, { useState } from 'react';
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
  <Link
    as={`/employer/${companySlug}/jobs/create`}
    href={`/employer/[company-slug]/jobs/create`}
  >
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

          setHasJobs(jobs.length > 0);

          if (jobs.length === 0) {
            return <JobsNoResultsView companySlug={companySlug} />;
          }

          return <CompanyJobsTable jobs={jobs} />;
        }}
      </FindAllJobsComponent>
    </CompanyCardContent>
  );
};
