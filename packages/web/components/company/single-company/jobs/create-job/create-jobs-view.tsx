import React from 'react';
import { Formik } from 'formik';
import { useQuery } from 'react-apollo';

import {
  CreateJobComponent,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { CreateJobSchema } from '../../../../../utils/yup-validation';
import { CompanyCreateJobsForm } from './form/create-jobs-form';
import { initialJobValues } from './initial-job-values';
import { CompanyCardContent, CompanyBreadcrumb } from '../../../shared';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/jobs', title: 'Jobs' },
  { path: '/create', title: 'Create Job' },
];

export const CompanyCreateJobsView: React.FunctionComponent = () => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  return (
    <CompanyCardContent breadcrumbs={breadcrumbRoutes}>
      <CreateJobComponent>
        {create => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async input => {
              try {
                await create({
                  variables: { companySlug: currentCompany.slug, input },
                });
                console.log('submitted successfully');
              } catch (err) {
                console.log(err);
              }
            }}
            initialValues={initialJobValues}
            validationSchema={CreateJobSchema}
          >
            {formikProps => <CompanyCreateJobsForm {...formikProps} />}
          </Formik>
        )}
      </CreateJobComponent>
    </CompanyCardContent>
  );
};
