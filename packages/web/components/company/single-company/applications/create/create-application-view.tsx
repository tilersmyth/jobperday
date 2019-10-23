import React from 'react';
import { Formik } from 'formik';
import { useQuery } from 'react-apollo';

import { CompanyCardContent, CompanyBreadcrumb } from '../../../shared';
import {
  CreateApplicationComponent,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { createApplicationSchema } from './validation/application-schema';
import { initialApplicationValues } from './initial-values/application-values';
import { CreateApplicationForm } from './form/create-application-form';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/applications', title: 'Applications' },
  { path: '/applications/create', title: 'Create Application' },
];

export const CreateApplicationView: React.FunctionComponent = () => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  return (
    <CompanyCardContent breadcrumbs={breadcrumbRoutes}>
      <CreateApplicationComponent>
        {create => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async input => {
              try {
                console.log('submitted', input);

                const application = await create({
                  variables: { companySlug: currentCompany.slug, input },
                });

                console.log(application);
              } catch (err) {
                console.log(err);
              }
            }}
            initialValues={initialApplicationValues}
            validationSchema={createApplicationSchema}
          >
            {formikProps => <CreateApplicationForm {...formikProps} />}
          </Formik>
        )}
      </CreateApplicationComponent>
    </CompanyCardContent>
  );
};
