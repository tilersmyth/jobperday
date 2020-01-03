import React from 'react';
import { Formik } from 'formik';
import { ApolloConsumer } from 'react-apollo';
import { updatedDiff } from 'deep-object-diff';
import Router from 'next/router';
import { createCompanySteps } from '@jobperday/common';

import { companySetupSchema } from './validation-schema';
import { CompanySetupForm } from './form';
import { SetupFormValues } from './initial-values';
import {
  CreateCompanyDocument,
  CreateCompanyMutation,
  UpdateCompanyMutation,
  UpdateCompanyDocument,
  CurrentCompanyDocument,
} from '../../../../../../apollo';
import { serverValidationError } from '../../../../../../utils/validation-util';

interface Props {
  data: SetupFormValues;
  step: number;
}

export const CompanySetupFormView: React.FunctionComponent<Props> = ({
  data,
  step,
}) => (
  <ApolloConsumer>
    {client => (
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={async (input, { setErrors }) => {
          const setupNext = createCompanySteps.find(
            setup => setup.step === step + 1,
          );

          if (!setupNext) {
            console.log('error finding next step');
            return;
          }

          try {
            if (data.id) {
              const updatedInputs = updatedDiff(data, input);

              // No form updates
              if (Object.entries(updatedInputs).length === 0) {
                Router.push(
                  `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
                  `/company/create/${
                    data.slug
                  }/${setupNext.title.toLowerCase()}`,
                );
                return;
              }

              await client.mutate<UpdateCompanyMutation>({
                mutation: UpdateCompanyDocument,
                variables: {
                  companySlug: data.slug,
                  input: updatedInputs,
                },
                update(cache) {
                  const { currentCompany } = cache.readQuery<any>({
                    query: CurrentCompanyDocument,
                  });

                  Object.assign(currentCompany, updatedInputs);

                  cache.writeQuery({
                    query: CurrentCompanyDocument,
                    data: {
                      currentCompany: { ...currentCompany, setup_stage: 2 },
                    },
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

            const create = await client.mutate<CreateCompanyMutation>({
              mutation: CreateCompanyDocument,
              variables: {
                input,
              },
            });

            if (!create.data) {
              console.log('throw error');
              return;
            }

            Router.push(
              `/company/create/[slug]/${setupNext.title.toLowerCase()}`,
              `/company/create/${
                create.data.createCompany.slug
              }/${setupNext.title.toLowerCase()}`,
            );
          } catch (err) {
            const errors = serverValidationError(err);
            return errors && setErrors(errors);
          }
        }}
        initialValues={data}
        validationSchema={companySetupSchema}
      >
        {formikProps => <CompanySetupForm step={step} {...formikProps} />}
      </Formik>
    )}
  </ApolloConsumer>
);
