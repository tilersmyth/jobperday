import React from 'react';

import { SearchResultDetail } from '../sidebar/result-detail';
import { SearchResults } from '../search-type';
import { SearchFilterDetail } from '../../shared';
import { SearchInput } from '../../../apollo';
import styles from './style.less';

interface Props {
  search: SearchResults;
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchMobileDetail: React.FunctionComponent<Props> = ({
  search,
  searchArgs,
  setSearchArgs,
}) => (
  <div className={styles.container}>
    <SearchResultDetail search={search} />
    <SearchFilterDetail searchArgs={searchArgs} setSearchArgs={setSearchArgs} />
  </div>
);
