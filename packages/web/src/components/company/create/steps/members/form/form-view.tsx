import React from 'react';
import { Formik } from 'formik';
import { useQuery } from 'react-apollo';
import Router from 'next/router';

import { CompanyMembersForm } from './form';
import {
  CreateCompanyMembersComponent,
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../../../apollo';

interface Props {
  step: number;
}

export const CompanyMembersFormView: React.FunctionComponent<Props> = ({
  step,
}) => {
  const {
    loading: companyLoading,
    data: companyData,
    error: companyError,
  } = useQuery<CurrentCompanyQuery>(CurrentCompanyDocument);

  if (companyError || !companyData || companyLoading) {
    return null;
  }

  const { currentCompany } = companyData;
  return (
    <CreateCompanyMembersComponent>
      {create => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async input => {
            try {
              await create({
                variables: { companySlug: currentCompany.slug, input },
                update(cache) {
                  cache.writeQuery({
                    query: CurrentCompanyDocument,
                    data: {
                      currentCompany: {
                        ...currentCompany,
                        setup_complete: true,
                      },
                    },
                  });

                  Router.push(
                    `/company/create/[slug]/complete`,
                    `/company/create/${currentCompany.slug}/complete`,
                  );
                },
              });
            } catch (err) {
              console.log(err);
            }
          }}
          initialValues={[]}
        >
          {formikProps => <CompanyMembersForm step={step} {...formikProps} />}
        </Formik>
      )}
    </CreateCompanyMembersComponent>
  );
};
