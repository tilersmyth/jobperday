import React from 'react';

import {
  TextInputType,
  RadioInputType,
  CheckboxInputType,
  TextareaInputType,
} from './input-types';
import {
  ApplicationFieldsEnum,
  ApplicationFieldInput,
} from '../../../../../../../apollo/generated-components';

interface Props {
  type: ApplicationFieldsEnum;
  options?: ApplicationFieldInput['options'];
}

export const FieldInputType: React.FunctionComponent<Props> = ({
  type,
  options,
}) => {
  switch (type) {
    case ApplicationFieldsEnum.Text:
      return <TextInputType />;
    case ApplicationFieldsEnum.Radio:
      return <RadioInputType options={options} />;
    case ApplicationFieldsEnum.Checkbox:
      return <CheckboxInputType options={options} />;
    default:
      return <TextareaInputType />;
  }
};
