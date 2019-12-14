import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

import { SearchQuery } from '../../../apollo';
import { SearchResultItem } from './item';

interface Props {
  data: SearchQuery;
  loadMore: () => void;
  hasMore: boolean;
  onPostingSelect: (id: string, index: number) => Promise<void>;
  selectedPosting?: string;
}

export const SearchResultList: React.FunctionComponent<Props> = ({
  data,
  loadMore,
  hasMore,
  onPostingSelect,
  selectedPosting,
}) => {
  const items = (
    (data.search && data.search.results) ||
    []
  ).map(({ posting }, i) => (
    <SearchResultItem
      key={posting.id}
      index={i}
      posting={posting}
      selectedId={selectedPosting}
      selectPosting={onPostingSelect}
    />
  ));

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
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
