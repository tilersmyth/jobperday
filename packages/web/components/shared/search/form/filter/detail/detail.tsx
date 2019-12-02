import React, { MouseEvent } from 'react';
import { Typography, Divider, Icon } from 'antd';

import { SearchInput } from '../../../../../../apollo';
import { searchFilterText } from './filter-text.util';
import styles from './style.less';

interface Props {
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => void;
}

export const SearchFilterDetail: React.FunctionComponent<Props> = ({
  searchArgs,
  setSearchArgs,
}) => {
  const { filters } = searchArgs;

  if (Object.keys(filters).length === 0) {
    return null;
  }

  const clearAll = (e: MouseEvent) => {
    e.preventDefault();
    setSearchArgs({ ...searchArgs, filters: {} });
  };

  const clear = (e: MouseEvent, prop: string) => {
    e.preventDefault();

    const newFilter = Object.keys(filters).reduce((acc, key) => {
      return key !== prop
        ? { ...acc, [key]: (filters as { [key: string]: string })[key] }
        : acc;
    }, {});

    setSearchArgs({ ...searchArgs, filters: newFilter });
  };

  return (
    <div>
      <Typography.Title level={3} className={styles.title}>
        Filters
        <a href="#" className={styles.clearAll} onClick={clearAll}>
          Clear All
        </a>
      </Typography.Title>
      <ul className={styles.list}>
        {Object.keys(filters).map(prop => {
          const text = searchFilterText(prop, filters);
          return (
            <li key={prop}>
              <span className={styles.prop}>{text.title}</span>:
              <span className={styles.text}>{text.detail}</span>
              <a
                href="#"
                className={styles.clear}
                onClick={e => clear(e, prop)}
              >
                <Icon type="close" />
              </a>
            </li>
          );
        })}
      </ul>

      <Divider className={styles.divider} />
    </div>
  );
};
