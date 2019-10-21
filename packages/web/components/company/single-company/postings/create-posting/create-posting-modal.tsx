import React, { useState, useRef } from 'react';
import { Modal, Button, notification } from 'antd';
import { Formik } from 'formik';
import { ApolloConsumer, useQuery } from 'react-apollo';

import {
  FindAllJobsComponent,
  CreatePostingDocument,
  CreatePostingClientDocument,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { CreatePostingsModalNoJobs } from './create-posting-modal-no-jobs';
import { createPostingSchema } from './form/create-posting-validation';
import {
  initialPostingValues,
  PostingInitialValues,
} from './form/initial-posting-values';
import { CreatePostingForm } from './form/create-posting-form';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const CreatePostingModal: React.FunctionComponent<Props> = ({
  ...modal
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const formRef = useRef<Formik<PostingInitialValues>>(null);
  const [hasJobs, setHasJobs] = useState(false);

  const handleSubmit = async (_: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      if (!formRef.current) {
        throw new Error('React form ref error');
      }
      await formRef.current.submitForm();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal
      title="Post Position"
      {...modal}
      maskClosable={false}
      destroyOnClose={true}
      closable={false}
      width={800}
      footer={
        hasJobs && [
          <Button key="back" onClick={() => modal.setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]
      }
    >
      <FindAllJobsComponent variables={{ companySlug: currentCompany.slug }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            return <div>error</div>;
          }

          const jobs = data.findAllJobs;

          setHasJobs(jobs.length > 0);

          if (jobs.length === 0) {
            return (
              <CreatePostingsModalNoJobs companySlug={currentCompany.slug} />
            );
          }

          return (
            <ApolloConsumer>
              {client => (
                <Formik
                  ref={formRef}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async ({ addressFormatted, ...input }) => {
                    try {
                      const posting = await client.mutate({
                        mutation: CreatePostingDocument,
                        variables: { companySlug: currentCompany.slug, input },
                        update(_, result) {
                          if (!result.data) {
                            throw new Error('Create posting error');
                          }

                          client.mutate({
                            mutation: CreatePostingClientDocument,
                            variables: {
                              postingId: result.data.createPosting.id,
                              companySlug: currentCompany.slug,
                            },
                          });
                        },
                      });

                      if (!posting || !posting.data) {
                        throw new Error('Create posting error');
                      }

                      modal.setVisible(false);

                      const { createPosting } = posting.data;

                      setTimeout(
                        () =>
                          notification.success({
                            message: 'Position posted',
                            description: `${createPosting.job.name} successfully posted!`,
                          }),
                        400,
                      );
                    } catch (err) {
                      console.log(err);
                      throw err;
                    }
                  }}
                  initialValues={initialPostingValues}
                  validationSchema={createPostingSchema}
                >
                  {formikProps => {
                    return (
                      <CreatePostingForm
                        {...formikProps}
                        jobs={jobs}
                        companySlug={currentCompany.slug}
                      />
                    );
                  }}
                </Formik>
              )}
            </ApolloConsumer>
          );
        }}
      </FindAllJobsComponent>
    </Modal>
  );
};
