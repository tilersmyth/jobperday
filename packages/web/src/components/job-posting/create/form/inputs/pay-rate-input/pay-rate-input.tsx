import React from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import { FieldProps, getIn } from 'formik';

import styles from './style.less';

export const PayRateInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
  ...inputProps
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Row gutter={16}>
      <Col md={{ span: 12 }}>
        <Form.Item
          label="Hourly rate"
          validateStatus={error ? 'error' : undefined}
          help={errorMsg}
        >
          <InputNumber
            {...inputProps}
            className={styles.input}
            defaultValue={field.value}
            min={1}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
            onChange={value => setFieldValue(field.name, `${value}`)}
          />
        </Form.Item>
      </Col>
      <Col md={{ span: 12 }}>
        <Form.Item label="Employee Makes">
          <InputNumber
            size="large"
            className={styles.input}
            disabled={true}
            formatter={value => `$ ${value}`}
            value={isNaN(field.value) ? field.value : field.value * 0.75}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
