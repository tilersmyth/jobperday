import { registerEnumType } from 'type-graphql';

export enum ApplicationFieldsEnum {
  input = 'input',
  textarea = 'textarea',
  radio = 'radio',
  checkbox = 'checkbox',
}

registerEnumType(ApplicationFieldsEnum, {
  name: 'FieldsEnum',
});
