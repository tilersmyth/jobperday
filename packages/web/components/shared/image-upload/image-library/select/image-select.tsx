import React from 'react';
import { Icon } from 'antd';
import cx from 'classnames';

import { FindAllCompanyImagesQuery } from '../../../../../apollo/generated-components';
import styles from './style.less';

interface Props {
  images: FindAllCompanyImagesQuery['findAllCompanyImages'];
  onSelect: (path: string) => void;
  selected: string[];
}

export const UploadImageSelect: React.FunctionComponent<Props> = ({
  images,
  onSelect,
  selected,
}) => {
  return (
    <React.Fragment>
      {images.map(image => {
        return (
          <a
            href="#"
            key={image.id}
            onClick={() => onSelect(image.path)}
            className={cx(styles.container, {
              [styles.selected]: selected.includes(image.path),
            })}
          >
            <div className={styles.image}>
              <Icon
                className={styles.icon}
                type="check-square"
                theme="filled"
              />
              <img src={image.path} />
            </div>
          </a>
        );
      })}
    </React.Fragment>
  );
};
