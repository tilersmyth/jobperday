import React from 'react';
import moment from 'moment';

import { FindPostingComponent } from '../../../../../apollo/generated-components';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';
import { Descriptions } from 'antd';

interface Props {
  companySlug: string;
  postingId: string;
}

export const SinglePostingView: React.FunctionComponent<Props> = ({
  companySlug,
  postingId,
}) => (
  <FindPostingComponent variables={{ companySlug, postingId }}>
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
        <CompanyCardContent
          breadcrumbs={breadcrumbRoutes}
          companySlug={companySlug}
        >
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
