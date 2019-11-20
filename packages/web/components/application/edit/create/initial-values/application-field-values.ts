import {
  ApplicationFieldInput,
  ApplicationFieldsEnum,
} from '../../../../../apollo/generated-components';

export const initialApplicationFieldValues: ApplicationFieldInput = {
  type: ApplicationFieldsEnum.Textarea,
  question: '',
  required: true,
  options: [],
};
