import React from 'react';
import { useQuery } from 'react-apollo';

import {
  SearchFindPostingDocument,
  SearchFindPostingQuery,
} from '../../../apollo';
import { LoaderMask } from '../../shared';
import { SearchResultViewHeader } from './header';
import { SearchResultViewContent } from './content';
import styles from './style.less';

interface Props {
  divRef: any;
  postingId: string;
}

export const SearchResultView: React.FunctionComponent<Props> = ({
  divRef,
  postingId,
}) => {
  const { loading, data, error } = useQuery<SearchFindPostingQuery>(
    SearchFindPostingDocument,
    {
      variables: { id: postingId },
    },
  );

  if (error || !data) {
    return null;
  }

  return (
    <div ref={divRef} className={styles.container}>
      {loading && <LoaderMask />}
      <SearchResultViewHeader posting={data.searchFindPosting} />
      <SearchResultViewContent posting={data.searchFindPosting} />
    </div>
  );
};
