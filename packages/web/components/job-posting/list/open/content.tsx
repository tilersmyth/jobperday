import React from 'react';
import Router from 'next/router';
import { Card, Divider, Typography } from 'antd';
import moment from 'moment';

import { FindAllPostingsQuery } from '../../../../apollo';
import { PostingsListContent } from '../shared';

const { Meta } = Card;

interface Props {
  companySlug: string;
  data: FindAllPostingsQuery;
  loadMore: () => any;
}

export const OpenPostingsContent: React.FunctionComponent<Props> = ({
  companySlug,
  data,
  loadMore,
}) => {
  const goToPosting = async (id: string) => {
    await Router.push(
      `/employer/[company-slug]/postings/[posting-id]`,
      `/employer/${companySlug}/postings/${id}`,
    );
  };

  return (
    <PostingsListContent data={data} loadMore={loadMore}>
      {posting => {
        const date = moment.utc(posting.start_date).calendar(undefined, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'MM/DD/YY',
        });

        return (
          <Card
            hoverable={true}
            bordered={false}
            onClick={() => goToPosting(posting.id)}
          >
            <Meta title={posting.job.title} description={`${date}, 12p - 4p`} />
            <Divider dashed={true} />
            <Typography.Text style={{ display: 'block' }}>
              <strong>Openings remaining: </strong>
              {posting.remaining_openings}
            </Typography.Text>
            <Typography.Text style={{ display: 'block' }}>
              <strong>Post expires: </strong>
              {moment.utc(posting.apply_deadline).fromNow()}
            </Typography.Text>
          </Card>
        );
      }}
    </PostingsListContent>
  );
};
