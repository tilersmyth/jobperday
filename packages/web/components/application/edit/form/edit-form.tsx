import React, { useState } from 'react';
import { Form, Row, Col, Typography, List, Divider, Card } from 'antd';
import { Field, FormikProps, FieldProps } from 'formik';

import { EditApplicationHeader } from '../layout';
import { InputField } from '../../../shared/input/input-field';
import { AddFieldModal } from './add-field-modal/add-field-modal';
import {
  ApplicationFieldInput,
  ApplicationInput,
} from '../../../../apollo/generated-components';
import { AddFieldButton } from './inputs';
import { ApplicationFieldPreview } from '../create/field-preview/application-field-preview';
import { ModalState } from './add-field-modal/modal-types';
import { initialApplicationFieldValues } from '../create/initial-values';
import './style.less';

export const EditApplicationForm: React.FunctionComponent<FormikProps<
  ApplicationInput
>> = ({ handleSubmit, setFieldValue, values }) => {
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
      <Form onSubmit={handleSubmit}>
        <EditApplicationHeader />

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col lg={{ span: 16 }}>
            <Card bordered={false}>
              <Field
                name="title"
                size="large"
                placeholder="Title"
                component={InputField}
              />

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
                  <AddFieldButton
                    setModalState={setModalState}
                    {...fieldProps}
                  />
                )}
              />
            </Card>
          </Col>
        </Row>
      </Form>
      <AddFieldModal
        state={modalState}
        setState={setModalState}
        onSubmit={onModalSubmit}
      />
    </React.Fragment>
  );
};
