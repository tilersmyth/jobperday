import React, { useState, ReactNode } from 'react';
import { Layout } from 'antd';

import { SearchInput } from '../../../../../apollo/generated-components';
import { CandidateLayout } from '../../../candidate';
import { SearchHeader } from '../header';
import { SearchDrawer } from '../drawer';
import styles from './style.less';

interface Props {
  searchArgs: SearchInput;
  updateArgs: (input: SearchInput) => Promise<void>;
  children: ReactNode;
}

export const SearchLayout: React.FunctionComponent<Props> = ({
  searchArgs,
  updateArgs,
  children,
}) => {
  const [drawer, openDrawer] = useState(false);

  return (
    <CandidateLayout title="Search">
      <Layout className={styles.container}>
        <SearchHeader searchArgs={searchArgs} openDrawer={openDrawer} />
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
      <SearchDrawer
        visible={drawer}
        searchArgs={searchArgs}
        setSearchArgs={updateArgs}
        close={() => openDrawer(false)}
      />
    </CandidateLayout>
  );
};
