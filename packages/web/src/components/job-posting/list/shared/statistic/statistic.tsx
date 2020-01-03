import React from 'react';
import { Statistic as AntStatistic } from 'antd';
import { StatisticProps } from 'antd/lib/statistic/Statistic';

import styles from './style.less';

interface Props extends StatisticProps {
  bottom?: boolean;
}

export const Statistic: React.FunctionComponent<Props> = ({
  bottom,
  ...statisticProps
}) => (
  <div>
    <AntStatistic
      {...statisticProps}
      title={bottom ? '' : statisticProps.title}
    />
    <span className={styles.bottom}>{bottom ? statisticProps.title : ''}</span>
  </div>
);
