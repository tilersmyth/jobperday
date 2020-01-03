import React from 'react';
import { Row, Col } from 'antd';

import { FindPostingQuery } from '../../../../apollo';
import { PostingVisibilityCard } from './visibility';
import { PostingApplicantsCard } from './applicants';
import styles from './style.less';

interface Props {
  posting: FindPostingQuery['findPosting'];
}

export const PostingSingleOpenView: React.FunctionComponent<Props> = ({
  posting,
}) => {
  return (
    <Row gutter={24}>
      <Col xl={16}>
        <PostingApplicantsCard className={styles.card} />
      </Col>
      <Col xl={8}>
        <PostingVisibilityCard posting={posting} className={styles.card} />
      </Col>
    </Row>
  );
};
