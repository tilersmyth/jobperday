import React from 'react';
import { Typography, Icon } from 'antd';
import moment from 'moment';

import { SearchQuery } from '../../../../apollo';
import './style.less';

interface Props {
  job: SearchQuery['search']['results'][0]['job'];
  selectJob: (id: string) => void;
  selectedId?: string;
}

export const SearchResultItem: React.FunctionComponent<Props> = ({
  job,
  selectJob,
  selectedId,
}) => {
  const dateDiff = (value: Date) => {
    return new Date().getTime() - new Date(value).getTime();
  };

  const postings = job.postings.sort((a, b) => {
    const distancea = Math.abs(dateDiff(a.start_date));
    const distanceb = Math.abs(dateDiff(b.start_date));
    return distancea - distanceb;
  });

  return (
    <div
      className={`search-result-item ${selectedId === job.id ? 'active' : ''}`}
      onClick={() => selectJob(job.id)}
    >
      <div className="company-image-container">
        <img src={job.company.profile.profile_image} />
      </div>
      <div className="item-content-container">
        <Typography.Text strong={true} className="content-item">
          {job.title}
        </Typography.Text>
        <div className="content-item">
          <Icon type="environment" />
          {postings[0].address.city}, {postings[0].address.state}
        </div>
        <div className="content-item">
          <span>
            <Icon type="dollar" />
            {postings[0].pay_rate}/hr
          </span>
          <span>
            <Icon type="calendar" />
            {moment.utc(postings[0].start_date).calendar()}
          </span>
        </div>
      </div>
    </div>
  );
};
