import React from 'react';
import { Formik } from 'formik';
import { ApolloConsumer, useQuery } from 'react-apollo';
import Router from 'next/router';
import { updatedDiff } from 'deep-object-diff';
import { createCompanySteps } from '@jobperday/common';

import { companyContactSchema } from './validation-schema';
import { CompanyContactForm } from './form';
import { ContactFormValues } from './initial-values';
import {
  CurrentCompanyDocument,
  CreateCompanyContactMutation,
  CreateCompanyContactDocument,
  UpdateCompanyContactMutation,
  UpdateCompanyContactDocument,
  UpdateCompanyContactInput,
  UpdateCompanyContactClientDocument,
} from '../../../../../../apollo';

interface Props {
  data: ContactFormValues;
  step: number;
}

export const CompanyContactFormView: React.FunctionComponent<Props> = ({
  data,
  step,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);
  return (
    <ApolloConsumer>
      {client => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async ({ formatted_address, ...input }) => {
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
                ) as UpdateCompanyContactInput;

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
                  address: {
                    ...updatedInputs.address,
                    id: data.address.id,
                  },
                });

                await client.mutate<UpdateCompanyContactMutation>({
                  mutation: UpdateCompanyContactDocument,
                  variables: {
                    companySlug: currentCompany.slug,
                    input: updatedInputs,
                  },
                  update(_, updates) {
                    if (!updates.data) {
                      console.log('error updating contact');
                      return;
                    }

                    const { updateCompanyContact } = updates.data;

                    client.mutate({
                      mutation: UpdateCompanyContactClientDocument,
                      variables: { input: updateCompanyContact },
                    });

                    Router.push(
                      `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
                      `/company/create/${
                        currentCompany.slug
                      }/${setupNext.title.toLowerCase()}`,
                    );
                  },
                });

                return;
              }

              await client.mutate<CreateCompanyContactMutation>({
                mutation: CreateCompanyContactDocument,
                variables: {
                  companySlug: currentCompany.slug,
                  input,
                },
                async update(_, create) {
                  if (!create.data) {
                    console.log('error creating contact');
                    return;
                  }
                  const { createCompanyContact } = create.data;

                  await client.mutate({
                    mutation: UpdateCompanyContactClientDocument,
                    variables: { input: createCompanyContact },
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
          validationSchema={companyContactSchema}
        >
          {formikProps => <CompanyContactForm step={step} {...formikProps} />}
        </Formik>
      )}
    </ApolloConsumer>
  );
};
