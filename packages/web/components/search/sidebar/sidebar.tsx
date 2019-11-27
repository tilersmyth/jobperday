import React from 'react';
import { Card } from 'antd';

import { SearchInput } from '../../../apollo/generated-components';
import { SearchFilterForm } from '../../shared';
import { SearchAffix } from '../affix';
import styles from './style.less';

interface Props {
  searchArgs: SearchInput;
  updateArgs: (args: SearchInput) => Promise<void>;
}

export const SearchSidebar: React.FunctionComponent<Props> = ({
  searchArgs,
  updateArgs,
}) => {
  return (
    <SearchAffix className={styles.container}>
      <Card title="Search Filter" bordered={false}>
        <SearchFilterForm searchArgs={searchArgs} updateArgs={updateArgs} />
      </Card>
    </SearchAffix>
  );
};
