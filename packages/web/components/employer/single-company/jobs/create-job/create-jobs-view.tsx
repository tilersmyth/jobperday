import React from 'react';
import { Formik } from 'formik';

import { CreateJobComponent } from '../../../../../apollo/generated-components';
import { CreateJobSchema } from '../../../../../utils/yup-validation';
import { CompanyCreateJobsForm } from './form/create-jobs-form';
import { initialJobValues } from './initial-job-values';
import { JobsBreadcrumb } from '../shared/jobs-breadcrumb';
import { JobsLayout } from '../shared/layout/jobs-layout';

interface Props {
  companySlug: string;
}

const breadcrumbRoutes: JobsBreadcrumb[] = [
  { path: '/', title: 'Jobs' },
  { path: '/create', title: 'Create Job' },
];

export const CompanyCreateJobsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  return (
    <JobsLayout breadcrumbs={breadcrumbRoutes} companySlug={companySlug}>
      <CreateJobComponent>
        {create => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async input => {
              try {
                await create({ variables: { companySlug, input } });
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
    </JobsLayout>
  );
};
