import React, { useState } from 'react';
import { Layout } from 'antd';

import { SearchInput } from '../../../apollo/generated-components';
import { CandidateLayout, SearchHeader, SearchDrawer } from '../../shared';
import './style.less';

interface Props {
  searchArgs: SearchInput;
}

export const CandidateHomeView: React.FunctionComponent<Props> = ({
  searchArgs,
}) => {
  const [args, setArgs] = useState(searchArgs);
  const [drawer, openDrawer] = useState(false);

  const handleDrawerArgs = async (value: SearchInput) => {
    // On candidate page we set arg state as we are building query
    // as opposed to search page where filter will update query
    setArgs(value);
  };

  return (
    <CandidateLayout title="Candidate">
      <Layout className="candidate-search-content">
        <SearchHeader searchArgs={args} openDrawer={openDrawer} />
        condidate
      </Layout>
      <SearchDrawer
        visible={drawer}
        searchArgs={args}
        updateArgs={handleDrawerArgs}
        close={() => openDrawer(false)}
      />
    </CandidateLayout>
  );
};
