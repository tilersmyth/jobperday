import React from 'react';
import { Card } from 'antd';
import { Formik } from 'formik';

import { CreateJobComponent } from '../../../../../apollo/generated-components';
import { CreateJobSchema } from '../../../../../utils/yup-validation';
import { CompanyCreateJobsForm } from './form/create-jobs-form';
import { initialJobValues } from './initial-job-values';

interface Props {
  companySlug: string;
}

export const CompanyCreateJobsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  return (
    <Card bordered={false} title="Create New Job">
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
    </Card>
  );
};
