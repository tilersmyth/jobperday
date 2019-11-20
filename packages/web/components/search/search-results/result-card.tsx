import React from 'react';
import { Card, Descriptions } from 'antd';
import moment from 'moment';

import { SearchQuery } from '../../../apollo/generated-components';

interface Props {
  result: SearchQuery['search']['results'][0];
}

export const ResultCard: React.SFC<Props> = ({ result: { job } }) => {
  const dateDiff = (value: Date) => {
    return new Date().getTime() - new Date(value).getTime();
  };

  const postings = job.postings.sort((a, b) => {
    const distancea = Math.abs(dateDiff(a.start_date));
    const distanceb = Math.abs(dateDiff(b.start_date));
    return distancea - distanceb;
  });

  return (
    <Card bordered={false} style={{ marginBottom: 20 }}>
      <div>
        <Descriptions title={job.title}>
          <Descriptions.Item label="Company">
            Need Company Name
          </Descriptions.Item>
          <Descriptions.Item label="Job type">{job.type}</Descriptions.Item>
          <Descriptions.Item label="Apply deadline">
            {moment.utc(postings[0].apply_deadline).fromNow()}
          </Descriptions.Item>
          <Descriptions.Item label="Hourly rate">
            ${postings[0].pay_rate.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Openings">
            {postings[0].total_openings}
          </Descriptions.Item>
          <Descriptions.Item label="Upcoming postings">
            {postings.length - 1}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};
