import React, { useState } from 'react';
import { FieldProps } from 'formik';
import { Input, Button, Tag, Form } from 'antd';

import './style.less';

export const JobTagsInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue, setFieldError, errors },
}: FieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Form.Item className="job-tags-input" help={errors[field.name]}>
      {field.value.length > 0 && (
        <div className="job-tags-preview-container">
          {field.value.map((tag: string, i: number) => (
            <Tag
              key={i}
              closable={true}
              visible={true}
              onClose={() => {
                field.value.splice(i, 1);
                setFieldValue(field.name, field.value);
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <Input.Search
        name={field.name}
        size="large"
        value={inputValue}
        enterButton={<Button>Add</Button>}
        onChange={e => {
          setFieldError(field.name, '');
          setInputValue(e.target.value);
        }}
        onSearch={(value, e) => {
          if (!e) {
            return;
          }
          // need this so form is not submitted on enter
          e.preventDefault();

          // Custom validation
          if (value.length < 4) {
            setFieldError(field.name, 'Tag must be greater than 3 characters');
            return;
          }

          if (value.length >= 25) {
            setFieldError(field.name, 'Tag must be less than 25 characters');
            return;
          }

          if (field.value.length >= 10) {
            setFieldError(field.name, '10 tag limit per job');
            return;
          }

          if (field.value.includes(value)) {
            setFieldError(field.name, `${value} already exists`);
            return;
          }

          setFieldValue(field.name, [...field.value, value]);
          setInputValue('');
        }}
      />
    </Form.Item>
  );
};
