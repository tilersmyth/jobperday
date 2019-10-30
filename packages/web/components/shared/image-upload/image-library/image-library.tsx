import React from 'react';
import { useQuery } from 'react-apollo';
import { Spin } from 'antd';

import {
  CurrentCompanyDocument,
  FindAllCompanyImagesDocument,
  FindAllCompanyImagesQuery,
} from '../../../../apollo/generated-components';

interface Props {
  setTab: (value: string) => void;
}

export const ImageLibrary: React.FunctionComponent<Props> = ({ setTab }) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const { loading, error, data } = useQuery<FindAllCompanyImagesQuery>(
    FindAllCompanyImagesDocument,
    {
      variables: { companySlug: currentCompany.slug },
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
        No images yet. <a onClick={() => setTab('2')}>Upload Image!</a>{' '}
      </div>
    );
  }

  return <div>image upload</div>;
};
