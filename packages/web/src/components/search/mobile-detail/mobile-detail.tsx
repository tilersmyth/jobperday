import React from 'react';

import { SearchFilterDetail, SearchResultDetail } from '../../shared';
import { SearchInput, SearchQuery } from '../../../apollo';
import styles from './style.less';

interface Props {
  data?: SearchQuery;
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchMobileDetail: React.FunctionComponent<Props> = ({
  data,
  searchArgs,
  setSearchArgs,
}) => (
  <div className={styles.container}>
    <SearchResultDetail data={data} />
    <SearchFilterDetail searchArgs={searchArgs} setSearchArgs={setSearchArgs} />
  </div>
);
