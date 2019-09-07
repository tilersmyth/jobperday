import React from 'react';
import { Typography } from 'antd';

import { SearchLayout } from './search-layout';
import { MeQuery } from '../../apollo/generated-components';

interface Props {
  me: MeQuery['me'] | null;
}

export const SearchView: React.FunctionComponent<Props> = ({ me }) => {
  return (
    <SearchLayout title="Search">
      <div style={{ textAlign: 'center' }}>
        <Typography.Text
          strong={true}
          style={{ display: 'block', marginBottom: 10 }}
        >
          {me ? `${me.first_name}` : 'non-auth user'}
        </Typography.Text>
      </div>
    </SearchLayout>
  );
};
