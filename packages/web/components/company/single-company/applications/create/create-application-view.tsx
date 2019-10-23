import React from 'react';
import { Formik } from 'formik';

import { CompanyCardContent, CompanyBreadcrumb } from '../../../shared';
import { CreateApplicationComponent } from '../../../../../apollo/generated-components';
import { createApplicationSchema } from './validation/application-schema';
import { initialApplicationValues } from './initial-values/application-values';
import { CreateApplicationForm } from './form/create-application-form';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/applications', title: 'Applications' },
  { path: '/applications/create', title: 'Create Application' },
];

export const CreateApplicationView: React.FunctionComponent = () => (
  <CompanyCardContent breadcrumbs={breadcrumbRoutes}>
    <CreateApplicationComponent>
      {() => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async input => {
            try {
              console.log('submitted', input);
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
