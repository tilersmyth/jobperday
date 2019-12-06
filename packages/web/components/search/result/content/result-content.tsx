import React, { useState } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import moment from 'moment';

import { SearchFindPostingQuery } from '../../../../apollo';
import { ApplyModal } from '../../../shared';
import styles from './style.less';

interface Props {
  posting: SearchFindPostingQuery['searchFindPosting'];
}

export const SearchResultViewContent: React.FunctionComponent<Props> = ({
  posting,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!posting) {
    return null;
  }

  const {
    remaining_openings,
    pay_rate,
    start_date,
    apply_deadline,
    address,
  } = posting;

  return (
    <div>
      <div className={styles.header}>
        <Row>
          <Col xl={{ span: 18 }} className={styles.status}>
            This post has{' '}
            <strong>
              {remaining_openings} opening
              {remaining_openings === 1 ? '' : 's'}
            </strong>{' '}
            and <strong>expires {moment.utc(apply_deadline).fromNow()}</strong>
          </Col>
          <Col xl={{ span: 6 }} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => setModalOpen(true)}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </div>
      <ul className={styles.details}>
        <li>
          <Icon type="dollar" className={styles.icon} />
          {pay_rate}/hr
        </li>
        <li>
          <Icon type="calendar" className={styles.icon} />
          {moment.utc(start_date).calendar()}
        </li>
        <li className="address">
          <Icon type="environment" className={styles.icon} />
          {address.street} {address.street2 ? address.street2 : ''}{' '}
          {address.city}, {address.state} {address.postal_code}
        </li>
      </ul>
      <div className={styles.description}>{posting.job.description}</div>
      <ApplyModal
        visible={modalOpen}
        setVisible={setModalOpen}
        posting={posting}
      />
    </div>
  );
};
