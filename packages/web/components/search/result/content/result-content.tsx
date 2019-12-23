import React, { useState } from 'react';

import { SearchFindPostingQuery } from '../../../../apollo';
import { ApplyModal } from '../../../shared';
import { SearchPreviewContentHeader } from './header/header';
import { SearchPreviewStats } from './stats/stats';
import { SearchPreviewContentFooter } from './footer/footer';
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

  return (
    <div className={styles.container}>
      <SearchPreviewContentHeader
        className={styles.header}
        address={posting.address}
        openApplyModal={setModalOpen}
      />

      <SearchPreviewStats className={styles.stats} posting={posting} />

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: posting.job.description }}
      />

      <SearchPreviewContentFooter
        className={styles.tags}
        openApplyModal={setModalOpen}
        tags={posting.job.tags}
      />

      <ApplyModal
        visible={modalOpen}
        setVisible={setModalOpen}
        posting={posting}
      />
    </div>
  );
};
