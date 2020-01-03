import React from 'react';
import { Formik } from 'formik';
import { notification } from 'antd';
import { useQuery, useMutation } from 'react-apollo';
import Router from 'next/router';

import { EditJobLayout } from '../layout';
import { INITIAL_JOB_VALUES } from './initial-values';
import {
  CreateJobComponent,
  FindCompanyProfileQuery,
  FindCompanyProfileDocument,
  JobInput,
  UpdateJobListDocument,
  UpdateJobListMutation,
} from '../../../../apollo';
import { jobSchema, validationFormatter } from '../validation-schema';
import { EditJobForm } from '../form';

interface Props {
  companySlug: string;
}

export const CreateJobView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const [updateJobList] = useMutation<UpdateJobListMutation>(
    UpdateJobListDocument,
  );
  const { loading, data, error } = useQuery<FindCompanyProfileQuery>(
    FindCompanyProfileDocument,
    {
      variables: { companySlug },
    },
  );

  if (loading) {
    return null;
  }

  if (error || !data || !data.findCompanyProfile) {
    return <div>Error loading company profile</div>;
  }

  const profile = data.findCompanyProfile;

  const formValues = Object.assign({}, INITIAL_JOB_VALUES, {
    default_image: profile.cover_image,
  });

  return (
    <EditJobLayout loading={false}>
      <CreateJobComponent>
        {create => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (input, { setStatus }) => {
              try {
                setStatus('loading');
                const { id, ...jobInputs } = input;
                await create({
                  variables: { companySlug, input: jobInputs as JobInput },
                  async update(_, updates) {
                    if (!updates.data) {
                      console.log('error updating contact');
                      return;
                    }

                    const { createJob } = updates.data;

                    // Update local storage
                    await updateJobList({
                      variables: { companySlug, input: createJob },
                    });

                    notification.success({
                      message: 'Job Successfully Created',
                    });

                    await Router.push(
                      '/employer/[company-slug]/jobs/[job-id]',
                      `/employer/${companySlug}/jobs/${createJob.id}`,
                    );
                  },
                });
              } catch (err) {
                console.log(err);
              } finally {
                setStatus('');
              }
            }}
            initialValues={formValues}
            validate={async values => {
              try {
                await jobSchema.validate(values, { abortEarly: false });
              } catch (err) {
                notification.error({
                  message: 'Create Job Failed',
                  description: validationFormatter(err),
                });
                throw err;
              }
            }}
          >
            {formikProps => <EditJobForm {...formikProps} />}
          </Formik>
        )}
      </CreateJobComponent>
    </EditJobLayout>
  );
};
