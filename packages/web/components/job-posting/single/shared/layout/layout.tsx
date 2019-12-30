import React, { ReactNode } from 'react';
import { useQuery } from 'react-apollo';
import Router from 'next/router';
import { Layout } from 'antd';

import {
  FindPostingDocument,
  FindPostingQuery,
  FindPostingQueryVariables,
  PostingStatusEnum,
} from '../../../../../apollo';
import { CompanyPageHeader, LoaderMask } from '../../../../shared';
import { PostingDetailsCard } from '../details';
import { PostingTitle } from '../title';

interface Props {
  children: (posting: FindPostingQuery['findPosting']) => ReactNode;
  companySlug: string;
  postingId: string;
}

export const PostingSingleLayout: React.FunctionComponent<Props> = ({
  children,
  ...variables
}) => {
  const { error, loading, data } = useQuery<
    FindPostingQuery,
    FindPostingQueryVariables
  >(FindPostingDocument, { variables });

  if (error || !data) {
    Router.replace(
      `/employer/[company-slug]/postings`,
      `/employer/${variables.companySlug}/postings`,
    );

    return null;
  }

  const { findPosting } = data;

  const goToBack = (status: PostingStatusEnum) => {
    const route = status === PostingStatusEnum.Closed ? 'closed' : '';

    Router.replace(
      `/employer/[company-slug]/postings/${route}`,
      `/employer/${variables.companySlug}/postings/${route}`,
    );
  };

  return (
    <React.Fragment>
      <CompanyPageHeader
        onBack={() => goToBack(findPosting.status)}
        title={<PostingTitle loading={loading} posting={findPosting} />}
      />
      <Layout.Content>
        <PostingDetailsCard loading={loading} posting={findPosting} />
        {loading ? <LoaderMask /> : children(findPosting)}
      </Layout.Content>
    </React.Fragment>
  );
};
