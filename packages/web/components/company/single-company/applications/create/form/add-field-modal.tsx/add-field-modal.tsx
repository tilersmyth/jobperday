import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import { Formik } from 'formik';

import { createApplicationFieldSchema } from '../../validation';
import { initialApplicationFieldValues } from '../../initial-values/application-field-values';
import { ApplicationFieldInput } from '../../../../../../../apollo/generated-components';
import { AddApplicatonFieldForm } from './add-field-form';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const AddFieldModal: React.FunctionComponent<Props> = ({ ...modal }) => {
  const formRef = useRef<Formik<ApplicationFieldInput>>(null);

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
      title="Add Application Field"
      {...modal}
      maskClosable={false}
      destroyOnClose={true}
      closable={false}
      width={600}
      footer={[
        <Button key="back" onClick={() => modal.setVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add Field
        </Button>,
      ]}
    >
      <Formik
        ref={formRef}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async () => {
          try {
            modal.setVisible(false);
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        initialValues={initialApplicationFieldValues}
        validationSchema={createApplicationFieldSchema}
      >
        {formikProps => <AddApplicatonFieldForm {...formikProps} />}
      </Formik>
    </Modal>
  );
};
