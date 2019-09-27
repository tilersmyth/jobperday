import React from 'react';
import { Typography } from 'antd';

import { SearchQuery } from '../../../apollo/generated-components';

interface Props {
  loading: boolean;
  results: SearchQuery['search'];
  locality: string;
}

export const ResultsHeader: React.SFC<Props> = ({
  loading,
  results,
  locality,
}) => {
  return (
    <Typography.Text
      strong={true}
      style={{ marginBottom: 20, display: 'block' }}
    >
      {loading && <span>&nbsp;</span>}
      {!loading && (
        <span>
          {`${results.count} ${
            results.count === 1 ? 'job met' : 'jobs meet'
          } your criteria in ${locality}`}
        </span>
      )}
    </Typography.Text>
  );
};
