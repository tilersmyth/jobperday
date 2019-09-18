import React, { useState } from 'react';
import { Layout, Typography } from 'antd';

import { CandidateLayout } from './candidate-layout';
import { SearchBar } from '../shared/layout/search-bar/search-bar';
import { MeQuery, SearchInput } from '../../apollo/generated-components';

const { Content } = Layout;

interface Props {
  me: MeQuery['me'];
  searchArgs: SearchInput;
}

export const CandidateView: React.FunctionComponent<Props> = ({
  me,
  searchArgs,
}) => {
  const [args, updateArgs] = useState(searchArgs);
  return (
    <CandidateLayout title="Candidate">
      <SearchBar searchArgs={args} updateArgs={updateArgs} />
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
