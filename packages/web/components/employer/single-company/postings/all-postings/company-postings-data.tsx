import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';

import {
  QueryFindCurrentPostingsArgs,
  FindCurrentPostingsDocument,
  FindCurrentPostingsQuery,
} from '../../../../../apollo/generated-components';

interface Props {
  variables: QueryFindCurrentPostingsArgs;
  children: (company: QueryResult<FindCurrentPostingsQuery>) => any;
}

export const CompanyPostingsData: React.FunctionComponent<Props> = ({
  variables,
  children,
}) => {
  const client = useQuery<FindCurrentPostingsQuery>(
    FindCurrentPostingsDocument,
    { variables, fetchPolicy: 'cache-and-network', ssr: false },
  );

  return children(client);
};
