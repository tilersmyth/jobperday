import React, { useState } from 'react';
import { Button, Form, Row, Col, Typography, List, Divider } from 'antd';
import { Field, FormikProps, FieldProps } from 'formik';

import { InputField } from '../../../../../shared/input/input-field';
import { AddFieldModal } from './add-field-modal.tsx/add-field-modal';
import {
  ApplicationFieldInput,
  ApplicationInput,
} from '../../../../../../apollo/generated-components';
import { AddFieldButton } from './inputs';
import { ApplicationFieldPreview } from '../field-preview/application-field-preview';
import './style.less';
import { ModalState } from './add-field-modal.tsx/modal-types';
import { initialApplicationFieldValues } from '../initial-values';

export const CreateApplicationForm: React.FunctionComponent<
  FormikProps<ApplicationInput>
> = ({ handleSubmit, setFieldValue, values }) => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    initialValues: initialApplicationFieldValues,
  });

  const onModalSubmit = (inputs: ApplicationFieldInput, editField?: number) => {
    try {
      if (typeof editField !== 'undefined') {
        values.fields[editField] = inputs;
        setFieldValue('fields', values.fields);
      } else {
        setFieldValue('fields', [...values.fields, inputs]);
      }

      setModalState({ ...modalState, visible: false });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const onDeleteField = (index: number) => {
    values.fields.splice(index, 1);
    setFieldValue('fields', values.fields);
  };

  return (
    <React.Fragment>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col lg={{ span: 12 }}>
            <Field
              label="Title"
              name="title"
              size="large"
              placeholder="Title"
              component={InputField}
            />
          </Col>
        </Row>

        {values.fields.length > 0 && (
          <div className="field-preview-container">
            <Typography.Title level={4}>Fields Preview</Typography.Title>
            {values.fields.map((field, i) => (
              <React.Fragment key={i}>
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={() =>
                        setModalState({
                          visible: true,
                          initialValues: field,
                          editField: i,
                        })
                      }
                    >
                      edit
                    </a>,
                    <a key="delete" onClick={() => onDeleteField(i)}>
                      delete
                    </a>,
                  ]}
                >
                  <ApplicationFieldPreview field={field} index={i} />
                </List.Item>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        )}

        <Field
          name="fields"
          render={(fieldProps: FieldProps) => (
            <AddFieldButton setModalState={setModalState} {...fieldProps} />
          )}
        />

        <Button type="primary" htmlType="submit" size="large">
          Save Application
        </Button>
      </Form>
      <AddFieldModal
        state={modalState}
        setState={setModalState}
        onSubmit={onModalSubmit}
      />
    </React.Fragment>
  );
};
