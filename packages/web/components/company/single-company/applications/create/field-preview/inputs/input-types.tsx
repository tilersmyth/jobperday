import React from 'react';
import { Input, Radio, Checkbox } from 'antd';

import { ApplicationFieldInput } from '../../../../../../../apollo/generated-components';

const { TextArea } = Input;

export const TextInputType: React.FunctionComponent = () => (
  <Input placeholder="Enter answer" disabled={true} />
);

export const TextareaInputType: React.FunctionComponent = () => (
  <TextArea rows={2} placeholder="Enter answer" disabled={true} />
);

interface InputWithOptions {
  options?: ApplicationFieldInput['options'];
}

export const RadioInputType: React.FunctionComponent<InputWithOptions> = ({
  options,
}) => {
  if (!options) {
    return null;
  }

  return (
    <React.Fragment>
      {options.map((option, i) => (
        <Radio key={i} disabled={true} defaultChecked={i === 0}>
          {option}
        </Radio>
      ))}
    </React.Fragment>
  );
};

export const CheckboxInputType: React.FunctionComponent<InputWithOptions> = ({
  options,
}) => {
  if (!options) {
    return null;
  }

  return (
    <React.Fragment>
      {options.map((option, i) => (
        <Checkbox key={i} disabled={true}>
          {option}
        </Checkbox>
      ))}
    </React.Fragment>
  );
};
