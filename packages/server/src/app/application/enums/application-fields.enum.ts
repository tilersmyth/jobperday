import { registerEnumType } from 'type-graphql';

export enum ApplicationFieldsEnum {
  text = 'text',
  textarea = 'textarea',
  radio = 'radio',
  checkbox = 'checkbox',
}

registerEnumType(ApplicationFieldsEnum, {
  name: 'ApplicationFieldsEnum',
});
