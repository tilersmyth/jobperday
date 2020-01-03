import React, { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin, Row, Col } from 'antd';

import { FindAllPostingsQuery } from '../../../../../apollo';
import styles from './style.less';

interface Props {
  children: (
    posting: FindAllPostingsQuery['findAllPostings']['postings'][0],
  ) => ReactNode;
  loadMore: () => void;
  data: FindAllPostingsQuery;
}

export const PostingsListContent: React.FunctionComponent<Props> = ({
  children,
  data,
  loadMore,
}) => {
  if (!data.findAllPostings) {
    return null;
  }
  const items = data.findAllPostings.postings || [];

  return (
    <InfiniteScroll
      loader={<Spin key={0} />}
      dataLength={items.length}
      next={loadMore}
      hasMore={data.findAllPostings.count > items.length}
      style={{ overflowX: 'hidden' }}
    >
      <Row gutter={24} className={styles.inner}>
        {items.map(posting => (
          <Col
            key={posting.id}
            xl={8}
            lg={8}
            md={12}
            sm={24}
            className={styles.col}
          >
            {children(posting)}
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};
