import { registerEnumType } from 'type-graphql';

export enum MemberRolesEnum {
  owner = 'owner',
  admin = 'admin',
  manager = 'manager',
  associate = 'associate',
}

registerEnumType(MemberRolesEnum, {
  name: 'MemberRolesEnum',
});
