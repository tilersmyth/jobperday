import React from 'react';

import { SearchFindJobQuery } from '../../../../apollo';
import './style.less';
import { Typography } from 'antd';

interface Props {
  job: SearchFindJobQuery['searchFindJob'];
}

export const SearchResultViewHeader: React.FunctionComponent<Props> = ({
  job,
}) => {
  if (!job) {
    return null;
  }
  return (
    <div
      className="job-result-view-header"
      style={{ backgroundImage: `url(${job.default_image})` }}
    >
      <div className="header-mask">
        <div className="job-title-container">
          <Typography.Title level={2}>{job.title}</Typography.Title>
          <Typography.Title level={4}>{job.company.name}</Typography.Title>
        </div>
      </div>
      <div className="job-type-container">{job.type}</div>
      <div className="company-image-container">
        <div className="company-image-inner">
          <img src={job.company.profile.profile_image} />
        </div>
      </div>
    </div>
  );
};
