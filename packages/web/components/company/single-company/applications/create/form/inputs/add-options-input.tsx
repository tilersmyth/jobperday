import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { FieldProps, getIn } from 'formik';

interface Props {
  index: number;
  value: string;
  onRemove: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionInput: React.FunctionComponent<Props> = ({
  index,
  value,
  onRemove,
  onChange,
}) => (
  <Row gutter={16} style={{ marginBottom: 5 }}>
    <Col sm={{ span: 20 }}>
      <Input
        value={value}
        placeholder={`Option ${index + 1}`}
        onChange={onChange}
      />
    </Col>
    <Col sm={{ span: 4 }}>
      <Button icon="delete" onClick={onRemove} />
    </Col>
  </Row>
);

export const AddOptionsInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <React.Fragment>
      <Form.Item
        label="Options"
        validateStatus={error ? 'error' : undefined}
        help={errorMsg}
      >
        {field.value.map((value: string, i: number) => (
          <OptionInput
            key={i}
            value={value}
            index={i}
            onRemove={() => {
              field.value.splice(i, 1);
              setFieldValue(field.name, field.value);
            }}
            onChange={({ target }) => {
              field.value[i] = target.value;
              setFieldValue(field.name, field.value);
            }}
          />
        ))}
        <Button onClick={() => setFieldValue(field.name, [...field.value, ''])}>
          Add Option
        </Button>
      </Form.Item>
    </React.Fragment>
  );
};
