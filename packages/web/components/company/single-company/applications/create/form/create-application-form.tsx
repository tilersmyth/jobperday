import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'antd';
import { Field, FormikProps } from 'formik';

import { InputField } from '../../../../../shared/input/input-field';
import { AddFieldModal } from './add-field-modal.tsx/add-field-modal';

export const CreateApplicationForm: React.FunctionComponent<
  FormikProps<{}>
> = ({ handleSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        <Button
          onClick={() => setModalVisible(true)}
          style={{ marginBottom: 20, display: 'block' }}
        >
          Add field
        </Button>

        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form>
      <AddFieldModal visible={modalVisible} setVisible={setModalVisible} />
    </React.Fragment>
  );
};
