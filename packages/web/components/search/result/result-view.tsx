import React from 'react';
import { useQuery } from 'react-apollo';

import { SearchFindJobDocument, SearchFindJobQuery } from '../../../apollo';
import { LoaderMask } from '../../shared';
import { SearchResultViewHeader } from './header';
import { SearchResultViewContent } from './content';
import styles from './style.less';

interface Props {
  selectedJob: string;
}

export const SearchResultView: React.FunctionComponent<Props> = ({
  selectedJob,
}) => {
  const { loading, data, error } = useQuery<SearchFindJobQuery>(
    SearchFindJobDocument,
    {
      variables: { id: selectedJob },
    },
  );

  if (error || !data) {
    return null;
  }

  return (
    <div className={styles.container}>
      {loading && <LoaderMask />}
      <SearchResultViewHeader job={data.searchFindJob} />
      <SearchResultViewContent job={data.searchFindJob} />
    </div>
  );
};
