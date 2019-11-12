import React from 'react';
import { useQuery } from 'react-apollo';
import { Spin } from 'antd';

import {
  FindAllCompanyImagesDocument,
  FindAllCompanyImagesQuery,
} from '../../../../apollo/generated-components';
import { UploadImageSelect } from './select/image-select';

interface Props {
  setTab: (value: string) => void;
  companySlug: string;
  onSelect: (path: string) => void;
  selected: string[];
}

export const ImageLibrary: React.FunctionComponent<Props> = ({
  setTab,
  companySlug,
  onSelect,
  selected,
}) => {
  const { loading, error, data } = useQuery<FindAllCompanyImagesQuery>(
    FindAllCompanyImagesDocument,
    {
      variables: { companySlug },
    },
  );

  if (loading) {
    return <Spin />;
  }

  if (error || !data) {
    return <div>Something went wrong!</div>;
  }

  if (data.findAllCompanyImages.length === 0) {
    return (
      <div>
        No images yet. <a onClick={() => setTab('1')}>Upload Image!</a>{' '}
      </div>
    );
  }

  return (
    <UploadImageSelect
      images={data.findAllCompanyImages}
      onSelect={onSelect}
      selected={selected}
    />
  );
};
