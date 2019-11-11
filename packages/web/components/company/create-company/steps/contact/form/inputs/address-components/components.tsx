import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'antd';

import { InputField } from '../../../../../../../shared/input/input-field';
import './style.less';

interface Props {
  change: () => void;
}

export const AddressComponents: React.FunctionComponent<Props> = ({
  change,
}) => {
  return (
    <div className="address_components">
      <Button type="link" onClick={change}>
        change address
      </Button>
      <Field
        name="address.street"
        size="large"
        component={InputField}
        readOnly={true}
      />
      <Row gutter={16}>
        <Col xl={{ span: 12 }}>
          <Field
            name="address.street2"
            size="large"
            placeholder="Street2 (optional)"
            component={InputField}
          />
        </Col>
        <Col md={{ span: 12 }}>
          <Field
            name="address.city"
            size="large"
            component={InputField}
            readOnly={true}
          />
        </Col>
        <Col xl={{ span: 8 }} md={{ span: 12 }}>
          <Field
            name="address.state"
            size="large"
            component={InputField}
            readOnly={true}
          />
        </Col>
        <Col xl={{ span: 8 }} md={{ span: 12 }}>
          <Field
            name="address.postal_code"
            size="large"
            component={InputField}
            readOnly={true}
          />
        </Col>
        <Col xl={{ span: 8 }} md={{ span: 12 }}>
          <Field
            name="address.country"
            size="large"
            component={InputField}
            readOnly={true}
          />
        </Col>
      </Row>
    </div>
  );
};
