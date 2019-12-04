import React, { useState } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import moment from 'moment';

import { SearchFindJobQuery } from '../../../../apollo';
import styles from './style.less';
import { ApplyModal } from '../../../shared';

interface Props {
  job: SearchFindJobQuery['searchFindJob'];
}

export const SearchResultViewContent: React.FunctionComponent<Props> = ({
  job,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!job) {
    return null;
  }

  const dateDiff = (value: Date) => {
    return new Date().getTime() - new Date(value).getTime();
  };

  const postings = job.postings.sort((a, b) => {
    const distancea = Math.abs(dateDiff(a.start_date));
    const distanceb = Math.abs(dateDiff(b.start_date));
    return distancea - distanceb;
  });

  const { remaining_openings, pay_rate, start_date, address } = postings[0];

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
            and{' '}
            <strong>
              expires {moment.utc(postings[0].apply_deadline).fromNow()}
            </strong>
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
      <div className={styles.description}>{job.description}</div>
      <ApplyModal
        visible={modalOpen}
        setVisible={setModalOpen}
        applicationId={postings[0].applicationId}
      />
    </div>
  );
};
