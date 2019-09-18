import React from 'react';
import { Affix, Card } from 'antd';

import { SearchInput } from '../../../apollo/generated-components';
import { SearchFilterForm } from '../../shared/layout/search-bar/search-filter-form';
import './style.less';

interface Props {
  searchArgs: SearchInput;
  updateArgs: (args: SearchInput) => Promise<void>;
}

export const SearchSidebar: React.FunctionComponent<Props> = ({
  searchArgs,
  updateArgs,
}) => {
  return (
    <div>
      <Affix offsetTop={65}>
        <Card title="Search Filter" bordered={false} className="filter-card">
          <SearchFilterForm searchArgs={searchArgs} updateArgs={updateArgs} />
        </Card>
      </Affix>
    </div>
  );
};
