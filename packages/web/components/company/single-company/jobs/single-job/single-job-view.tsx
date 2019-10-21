import React from 'react';
import { Descriptions } from 'antd';
import { useQuery } from 'react-apollo';

import {
  FindJobComponent,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';

interface Props {
  jobSlug: string;
}

export const SingleJobView: React.FunctionComponent<Props> = ({ jobSlug }) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  return (
    <FindJobComponent variables={{ companySlug: currentCompany.slug, jobSlug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>loading...</div>;
        }

        if (error || !data) {
          console.log(error);
          return <div>error</div>;
        }

        const job = data.findJob;

        const breadcrumbRoutes: CompanyBreadcrumb[] = [
          { path: '/jobs', title: 'Jobs' },
          { path: `/${job.id}`, title: `${job.name}` },
        ];

        return (
          <CompanyCardContent breadcrumbs={breadcrumbRoutes}>
            <Descriptions title={`${job.name}`}>
              <Descriptions.Item label="ID">{job.id}</Descriptions.Item>
              <Descriptions.Item label="Slug">{job.slug}</Descriptions.Item>
              <Descriptions.Item label="Type">{job.type}</Descriptions.Item>
              <Descriptions.Item label="Created">
                {job.created_at}
              </Descriptions.Item>
            </Descriptions>
          </CompanyCardContent>
        );
      }}
    </FindJobComponent>
  );
};
