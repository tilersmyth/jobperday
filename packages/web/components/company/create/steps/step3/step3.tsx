import React from 'react';
import { useQuery } from 'react-apollo';

import { FindCreateCompanyMembersDocument } from '../../../../../apollo/generated-components';
import { Step3Form } from './step3-form';

interface Props {
  companySlug?: string;
  nextStep: (id: string) => void;
  previousStep: () => void;
}

export const Step3: React.FunctionComponent<Props> = props => {
  const { companySlug } = props;

  if (!companySlug) {
    return null;
  }

  const { data, loading, error } = useQuery(FindCreateCompanyMembersDocument, {
    variables: { companySlug },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    console.log(error);
    return null;
  }

  const members = data.findCreateCompanyMembers;

  return <Step3Form companySlug={companySlug} members={members} {...props} />;
};
