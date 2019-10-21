import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import { useQuery } from 'react-apollo';

import {
  FindJobDocument,
  FindJobQuery,
} from '../../../../../../apollo/generated-components';

interface Props extends CardProps {
  companySlug: string;
  jobSlug: string;
  children: (loading: boolean, data?: FindJobQuery) => any;
}

export const JobLayout: React.FunctionComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ companySlug, jobSlug, children, ...cardProps }) => {
  const { error, loading, data } = useQuery<FindJobQuery>(FindJobDocument, {
    variables: { companySlug, jobSlug },
  });

  if (error) {
    return <div>Oops, something went awry</div>;
  }

  return (
    <Card bordered={false} {...cardProps}>
      {children(loading, data)}
    </Card>
  );
};
