import React from 'react';
import { useQuery } from 'react-apollo';
import Link from 'next/link';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../apollo/generated-components';

interface Props {
  children: any;
  as: string;
  href: string;
}

export const CompanyLink: React.FunctionComponent<Props> = ({
  children,
  as,
  href,
}) => {
  const { loading, data, error } = useQuery<CurrentCompanyQuery>(
    CurrentCompanyDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentCompany } = data;

  return (
    <Link
      as={`/employer/${currentCompany.slug}${as}`}
      href={`/employer/[company-slug]${href}`}
    >
      <a>{children}</a>
    </Link>
  );
};
