import React, { useEffect, useState, useRef } from 'react';
import { Avatar } from 'antd';
import cx from 'classnames';
import { AvatarProps } from 'antd/lib/avatar';

import { ProfileColorsEnum } from '../../../../../apollo';
import styles from './style.less';

interface Props extends AvatarProps {
  companyName: string;
  color: ProfileColorsEnum;
}

const companyInitials = (name: string) => {
  return name.split(' ').map(i => i.charAt(0).toUpperCase());
};

export const ProfileAvatar: React.SFC<Props> = ({
  companyName,
  color,
  ...avatarProps
}): JSX.Element => {
  const ref = useRef<Avatar>(null);
  const [fontSize, setFontSize] = useState(0);
  const [profileColor, setProfileColor] = useState();

  useEffect(() => {
    if (ref.current) {
      const elSize = ref.current.props.size;

      if (typeof elSize !== 'number') {
        throw Error('Profile avatar size must be a number');
      }

      setFontSize(elSize / 2);
    }

    if (color) {
      setProfileColor(color);
    }
  }, [color, ref.current]);

  return (
    <Avatar
      ref={ref}
      {...avatarProps}
      className={cx(
        styles.container,
        styles[profileColor],
        avatarProps.className,
      )}
      style={{ fontSize }}
    >
      {companyInitials(companyName)}
    </Avatar>
  );
};
