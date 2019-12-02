import React from 'react';

import { SearchInput } from '../../../apollo/generated-components';
import { SearchFilterForm, SearchFilterDetail } from '../../shared';
import { SearchAffix } from '../affix';
import { SearchResults } from '../search-type';
import { SearchResultDetail } from './result-detail';
import styles from './style.less';

interface Props {
  search: SearchResults;
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchSidebar: React.FunctionComponent<Props> = ({
  search,
  searchArgs,
  setSearchArgs,
}) => {
  return (
    <SearchAffix className={styles.container}>
      <React.Fragment>
        <SearchResultDetail search={search} />
        <SearchFilterDetail
          searchArgs={searchArgs}
          setSearchArgs={setSearchArgs}
        />
        <SearchFilterForm
          searchArgs={searchArgs}
          setSearchArgs={setSearchArgs}
        />
      </React.Fragment>
    </SearchAffix>
  );
};
