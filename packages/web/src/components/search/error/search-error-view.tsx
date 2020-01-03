import React, { useState } from 'react';
import { Typography } from 'antd';

import { SearchInput } from '../../../apollo/generated-components';
import { SearchSidebar } from '../sidebar';
import { SearchLayout } from '../../shared';
import { SearchMobileDetail } from '../mobile-detail';
import { SearchErrorEnum } from './search-error.enum';
import { errorMessages } from './error-messages';
import styles from './style.less';

interface Props {
  error: SearchErrorEnum;
  searchArgs: SearchInput;
}

export const SearchErrorView: React.FunctionComponent<Props> = ({
  error,
  searchArgs,
}) => {
  const [args, setArgs] = useState(searchArgs);

  const handleArgsUpdate = async (input: SearchInput) => {
    setArgs(input);
  };

  return (
    <SearchLayout searchArgs={args} updateArgs={handleArgsUpdate}>
      <SearchSidebar searchArgs={args} setSearchArgs={handleArgsUpdate} />
      <SearchMobileDetail searchArgs={args} setSearchArgs={handleArgsUpdate} />
      <div className={styles.container}>
        <Typography.Title level={2}>
          Search error: {errorMessages(error)}
        </Typography.Title>
      </div>
    </SearchLayout>
  );
};
