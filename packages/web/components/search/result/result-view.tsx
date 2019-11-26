import React from 'react';
import { useQuery } from 'react-apollo';

import { SearchFindJobDocument, SearchFindJobQuery } from '../../../apollo';
import { LoaderMask } from '../../shared';
import { SearchResultViewHeader } from './header';
import './style.less';
import { SearchResultViewContent } from './content';

interface Props {
  jobId: string;
}

export const SearchResultView: React.FunctionComponent<Props> = ({ jobId }) => {
  const { loading, data, error } = useQuery<SearchFindJobQuery>(
    SearchFindJobDocument,
    {
      variables: { id: jobId },
    },
  );

  if (error || !data) {
    return null;
  }

  return (
    <div className="job-result-view-container">
      {loading && <LoaderMask />}
      <SearchResultViewHeader job={data.searchFindJob} />
      <SearchResultViewContent job={data.searchFindJob} />
    </div>
  );
};
