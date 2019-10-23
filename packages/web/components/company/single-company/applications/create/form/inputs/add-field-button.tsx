import React from 'react';
import { Button, Form } from 'antd';
import { getIn, FieldProps } from 'formik';

import { initialApplicationFieldValues } from '../../initial-values';
import { ModalState } from '../add-field-modal.tsx/modal-types';

interface Props extends FieldProps {
  setModalState: (state: ModalState) => void;
}

export const AddFieldButton: React.FunctionComponent<Props> = ({
  field,
  form: { errors, touched },
  setModalState,
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);
  return (
    <Form.Item
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
      style={{ marginBottom: 20 }}
    >
      <Button
        onClick={() =>
          setModalState({
            visible: true,
            initialValues: initialApplicationFieldValues,
          })
        }
      >
        Add field
      </Button>
    </Form.Item>
  );
};
