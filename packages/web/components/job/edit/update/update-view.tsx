import React from 'react';
import { useQuery } from 'react-apollo';
import { notification } from 'antd';
import { Formik } from 'formik';
import Router from 'next/router';
import { diff } from 'deep-object-diff';

import {
  FindJobQuery,
  FindJobDocument,
  UpdateJobComponent,
  UpdateJobInput,
} from '../../../../apollo';
import { EditJobLayout } from '../layout';
import { jobSchema, validationFormatter } from '../validation-schema';
import { EditJobForm } from '../form';
import { INITIAL_JOB_VALUES } from '../create/initial-values';

interface Props {
  companySlug: string;
  jobId: string;
}

export const UpdateJobView: React.FunctionComponent<Props> = ({
  companySlug,
  jobId,
}) => {
  const { loading, error, data } = useQuery<FindJobQuery>(FindJobDocument, {
    variables: { companySlug, id: jobId },
  });

  if (error || !data) {
    Router.push(
      '/employer/[company-slug]/jobs/create',
      `/employer/${companySlug}/jobs/create`,
    );
    return null;
  }

  const formValues = Object.assign({}, INITIAL_JOB_VALUES, data.findJob);

  return (
    <EditJobLayout loading={loading}>
      <UpdateJobComponent>
        {updateJob => {
          return (
            <Formik
              enableReinitialize={true}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (input, { setStatus }) => {
                try {
                  const inputDiff = diff(data.findJob, input) as UpdateJobInput;

                  if (Object.entries(inputDiff).length === 0) {
                    notification.warning({
                      message: 'Nothing To Update',
                    });
                    return;
                  }

                  const inputUpdates = Object.keys(inputDiff).reduce(
                    (acc: any, prop: string) => {
                      return input[prop]
                        ? { [prop]: input[prop], ...acc }
                        : acc;
                    },
                    { id: data.findJob.id },
                  );

                  setStatus('loading');

                  await updateJob({
                    variables: {
                      companySlug,
                      input: inputUpdates,
                    },
                    update(cache, updates) {
                      if (!updates.data) {
                        console.log('error updating job');
                        return;
                      }

                      cache.writeQuery<FindJobQuery>({
                        query: FindJobDocument,
                        variables: { companySlug, id: jobId },
                        data: { findJob: updates.data.updateJob },
                      });

                      notification.success({
                        message: 'Job Successfully Updated',
                      });
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
          );
        }}
      </UpdateJobComponent>
    </EditJobLayout>
  );
};
