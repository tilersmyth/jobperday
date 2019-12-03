import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

import { SearchQuery } from '../../../apollo';
import { SearchResultItem } from './item';

interface Props {
  data: SearchQuery;
  loadMore: () => void;
  onJobSelect: (id: string) => void;
  selectedJob?: string;
}

export const SearchResultList: React.FunctionComponent<Props> = ({
  data,
  loadMore,
  onJobSelect,
  selectedJob,
}) => {
  const items = ((data.search && data.search.results) || []).map(({ job }) => (
    <SearchResultItem
      key={job.id}
      job={job}
      selectedId={selectedJob}
      selectJob={onJobSelect}
    />
  ));

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={data.search && data.search.count > items.length}
      loader={<Spin key={0} />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>End of results</b>
        </p>
      }
      pullDownToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      }
    >
      {items}
    </InfiniteScroll>
  );
};
