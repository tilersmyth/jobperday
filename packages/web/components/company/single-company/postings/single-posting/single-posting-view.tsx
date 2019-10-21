import React from 'react';
import moment from 'moment';
import { Descriptions } from 'antd';
import { useQuery } from 'react-apollo';

import {
  FindPostingComponent,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';

interface Props {
  postingId: string;
}

export const SinglePostingView: React.FunctionComponent<Props> = ({
  postingId,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  return (
    <FindPostingComponent
      variables={{ companySlug: currentCompany.slug, postingId }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <div>loading...</div>;
        }

        if (error || !data) {
          return <div>error</div>;
        }

        const posting = data.findPosting;

        const breadcrumbRoutes: CompanyBreadcrumb[] = [
          { path: '/postings', title: 'Postings' },
          { path: `/${posting.id}`, title: `${posting.job.name}` },
        ];

        return (
          <CompanyCardContent breadcrumbs={breadcrumbRoutes}>
            <Descriptions title={`${posting.job.name}`}>
              <Descriptions.Item label="ID">{posting.id}</Descriptions.Item>
              <Descriptions.Item label="Hourly Rate">
                {`$${posting.pay_rate.toFixed(2)}`}
              </Descriptions.Item>
              <Descriptions.Item label="Openings">
                {posting.remaining_openings}
              </Descriptions.Item>
              <Descriptions.Item label="Start Time">
                {moment.utc(posting.start_date).format('h:mm a, MM/DD/YY')}
              </Descriptions.Item>
              <Descriptions.Item label="End Time">
                {moment.utc(posting.end_date).format('h:mm a, MM/DD/YY')}
              </Descriptions.Item>
              <Descriptions.Item label="Apply Deadline">
                {moment.utc(posting.apply_deadline).format('h:mm a, MM/DD/YY')}
              </Descriptions.Item>
            </Descriptions>
          </CompanyCardContent>
        );
      }}
    </FindPostingComponent>
  );
};
