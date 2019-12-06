import { registerEnumType } from 'type-graphql';

export enum ApplicantStatusEnum {
  open = 'open',
  closed = 'closed',
}

registerEnumType(ApplicantStatusEnum, {
  name: 'ApplicantStatusEnum',
});
