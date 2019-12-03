import React from 'react';

import { SearchInput, SearchQuery } from '../../../apollo/generated-components';
import {
  SearchFilterForm,
  SearchFilterDetail,
  SearchResultDetail,
} from '../../shared';
import { SearchAffix } from '../affix';
import styles from './style.less';

interface Props {
  data?: SearchQuery;
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchSidebar: React.FunctionComponent<Props> = ({
  data,
  searchArgs,
  setSearchArgs,
}) => {
  return (
    <SearchAffix className={styles.container}>
      <div className={styles.inner}>
        <SearchResultDetail data={data} />
        <SearchFilterDetail
          searchArgs={searchArgs}
          setSearchArgs={setSearchArgs}
        />
        <SearchFilterForm
          searchArgs={searchArgs}
          setSearchArgs={setSearchArgs}
        />
      </div>
    </SearchAffix>
  );
};
