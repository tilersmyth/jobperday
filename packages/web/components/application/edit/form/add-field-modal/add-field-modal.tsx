import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import { Formik } from 'formik';

import { createApplicationFieldSchema } from '../../create/validation';
import { ApplicationFieldInput } from '../../../../../apollo/generated-components';
import { AddApplicatonFieldForm } from './add-field-form';
import { ModalState } from './modal-types';

interface Props {
  state: ModalState;
  setState: (state: ModalState) => void;
  onSubmit: (values: ApplicationFieldInput, fieldIndex?: number) => void;
}

export const AddFieldModal: React.FunctionComponent<Props> = ({
  onSubmit,
  ...modal
}) => {
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
      visible={modal.state.visible}
      maskClosable={false}
      destroyOnClose={true}
      closable={false}
      width={600}
      footer={[
        <Button
          key="back"
          onClick={() => modal.setState({ ...modal.state, visible: false })}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {typeof modal.state.editField !== 'undefined'
            ? 'Update Field'
            : 'Add Field'}
        </Button>,
      ]}
    >
      <Formik
        ref={formRef}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => onSubmit(values, modal.state.editField)}
        initialValues={modal.state.initialValues}
        validationSchema={createApplicationFieldSchema}
      >
        {formikProps => <AddApplicatonFieldForm {...formikProps} />}
      </Formik>
    </Modal>
  );
};
