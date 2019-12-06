import { registerEnumType } from 'type-graphql';

export enum ApplicantDecisionEnum {
  accept = 'accept',
  reject = 'reject',
  omit = 'omit',
}

registerEnumType(ApplicantDecisionEnum, {
  name: 'ApplicantDecisionEnum',
});
