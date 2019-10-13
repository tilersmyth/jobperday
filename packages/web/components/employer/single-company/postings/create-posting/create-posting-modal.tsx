import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { Formik } from 'formik';

import {
  FindAllJobsComponent,
  CreatePostingComponent,
} from '../../../../../apollo/generated-components';
import { CreatePostingsModalNoJobs } from './create-posting-modal-no-jobs';
import { createPostingSchema } from './form/create-posting-validation';
import { initialPostingValues } from './form/initial-posting-values';
import { CreatePostingForm } from './form/create-posting-form';

interface Props {
  companySlug: string;
  visible: boolean;
  onOk: () => void;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const CreatePostingModal: React.FunctionComponent<Props> = ({
  companySlug,
  ...modal
}) => {
  const formRef = useRef<Formik>(null);
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
      title="Create Job Posting"
      {...modal}
      maskClosable={false}
      destroyOnClose={true}
      width={800}
      footer={
        hasJobs && [
          <Button key="back" onClick={modal.onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]
      }
    >
      <FindAllJobsComponent variables={{ companySlug }}>
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
            return <CreatePostingsModalNoJobs companySlug={companySlug} />;
          }

          return (
            <CreatePostingComponent>
              {() => (
                <Formik
                  ref={formRef}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async input => {
                    try {
                      console.log(input);
                      modal.onOk();
                    } catch (err) {
                      console.log(err);
                      throw err;
                    }
                  }}
                  initialValues={initialPostingValues}
                  validationSchema={createPostingSchema}
                >
                  {formikProps => (
                    <CreatePostingForm
                      {...formikProps}
                      jobs={jobs}
                      companySlug={companySlug}
                    />
                  )}
                </Formik>
              )}
            </CreatePostingComponent>
          );
        }}
      </FindAllJobsComponent>
    </Modal>
  );
};
