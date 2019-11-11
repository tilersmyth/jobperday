import React from 'react';
import { Formik } from 'formik';
import { ApolloConsumer } from 'react-apollo';
import { createCompanySteps } from '@jobperday/common';
import { updatedDiff } from 'deep-object-diff';
import Router from 'next/router';

import { companyProfileSchema } from './validation-schema';
import { CompanyProfileForm } from './form';
import { ProfileFormValues } from './initial-values';
import {
  UpdateCompanyProfileInput,
  CurrentCompanyDocument,
  CreateCompanyProfileMutation,
  CreateCompanyProfileDocument,
  UpdateCompanyProfileClientDocument,
  UpdateCompanyProfileDocument,
  UpdateCompanyProfileMutation,
} from '../../../../../../apollo';

interface Props {
  data: ProfileFormValues;
  step: number;
}

export const CompanyProfileFormView: React.FunctionComponent<Props> = ({
  data,
  step,
}) => {
  return (
    <ApolloConsumer>
      {client => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async input => {
            const {
              data: { currentCompany },
            } = await client.query<any>({ query: CurrentCompanyDocument });

            const setupNext = createCompanySteps.find(
              setup => setup.step === step + 1,
            );

            if (!setupNext) {
              console.log('error finding next step');
              return;
            }

            try {
              if (data.id) {
                const updatedInputs = updatedDiff(
                  data,
                  input,
                ) as UpdateCompanyProfileInput;

                // No form updates
                if (Object.entries(updatedInputs).length === 0) {
                  Router.push(
                    `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
                    `/company/create/${
                      currentCompany.slug
                    }/${setupNext.title.toLowerCase()}`,
                  );
                  return;
                }

                Object.assign(updatedInputs, {
                  id: data.id,
                  ...updatedInputs,
                });

                await client.mutate<UpdateCompanyProfileMutation>({
                  mutation: UpdateCompanyProfileDocument,
                  variables: {
                    companySlug: currentCompany.slug,
                    input: updatedInputs,
                  },
                  update(_, updates) {
                    if (!updates.data) {
                      console.log('error updating profile');
                      return;
                    }

                    const { updateCompanyProfile } = updates.data;

                    client.mutate({
                      mutation: UpdateCompanyProfileClientDocument,
                      variables: { input: updateCompanyProfile },
                    });

                    Router.push(
                      `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
                      `/company/create/${
                        currentCompany.slug
                      }/${setupNext.title.toLowerCase()}`,
                    );
                  },
                });
              }

              await client.mutate<CreateCompanyProfileMutation>({
                mutation: CreateCompanyProfileDocument,
                variables: {
                  companySlug: currentCompany.slug,
                  input,
                },
                update(_, create) {
                  if (!create.data) {
                    console.log('error creating profile');
                    return;
                  }
                  const { createCompanyProfile } = create.data;

                  client.mutate({
                    mutation: UpdateCompanyProfileClientDocument,
                    variables: { input: createCompanyProfile },
                  });

                  Router.push(
                    `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
                    `/company/create/${
                      currentCompany.slug
                    }/${setupNext.title.toLowerCase()}`,
                  );
                },
              });
            } catch (err) {
              console.log(err);
            }
          }}
          initialValues={data}
          validationSchema={companyProfileSchema}
        >
          {formikProps => <CompanyProfileForm step={step} {...formikProps} />}
        </Formik>
      )}
    </ApolloConsumer>
  );
};
