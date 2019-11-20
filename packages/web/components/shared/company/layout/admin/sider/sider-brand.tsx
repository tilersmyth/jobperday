import React, { useState, useEffect } from 'react';
import { Avatar, Typography } from 'antd';

import { FindCompanyProfileQuery } from '../../../../../../apollo';
import { LoaderMask } from '../../../../loader';

interface Props {
  name: string;
  profile: FindCompanyProfileQuery['findCompanyProfile'];
}

export const SiderBrand: React.FunctionComponent<Props> = ({
  name,
  profile,
}) => {
  const [loading, setLoading] = useState(true);
  const [coverImg, setCoverImg] = useState('');

  useEffect(() => {
    if (profile) {
      setCoverImg(profile.cover_image);
      setLoading(false);
    }
  }, [profile]);

  return (
    <div
      className="sider-brand-container"
      style={{ backgroundImage: `url(${coverImg})` }}
    >
      {loading && <LoaderMask />}
      {profile && (
        <div className="sider-brand-inner">
          <Typography.Title level={2}>{name}</Typography.Title>
          <Avatar size={80} src={profile.profile_image} />
        </div>
      )}
    </div>
  );
};
