import React from 'react';
import { Icon } from 'antd';

import { FindAllCompanyImagesQuery } from '../../../../../apollo/generated-components';
import './style.less';

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
        const isSelected = selected.includes(image.path) ? 'selected' : '';

        return (
          <a
            href="#"
            key={image.id}
            onClick={() => onSelect(image.path)}
            className={`img_container ${isSelected}`}
          >
            <div className="image_wrapper">
              <Icon type="check-square" theme="filled" />
              <img src={image.path} />
            </div>
          </a>
        );
      })}
    </React.Fragment>
  );
};
