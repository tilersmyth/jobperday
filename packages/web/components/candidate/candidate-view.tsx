import React, { useState } from 'react';
import { Layout, Typography } from 'antd';

import { CandidateLayout } from './candidate-layout';
import { SearchBar } from '../shared/layout/search-bar/search-bar';
import { MeQuery } from '../../apollo/generated-components';
import { SearchModel } from '../../utils/search/SearchModel';

const { Content } = Layout;

interface Props {
  me: MeQuery['me'];
}

export const CandidateView: React.FunctionComponent<Props> = ({ me }) => {
  const [searchArgs, updateArgs] = useState(new SearchModel());
  return (
    <CandidateLayout title="Candidate">
      <SearchBar searchArgs={searchArgs} updateArgs={updateArgs} />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography.Text
            strong={true}
            style={{ display: 'block', marginBottom: 10 }}
          >
            Candidate: {me && me.first_name}
          </Typography.Text>
        </div>
      </Content>
    </CandidateLayout>
  );
};
