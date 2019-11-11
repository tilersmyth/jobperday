import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { MemberRoles } from '@jobperday/common';

import { UserDto } from '../../user/dto/user.dto';

enum RoleEnum {
  owner = 'owner',
  admin = 'admin',
  manager = 'manager',
  associate = 'associate',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@ObjectType()
export class CompanyMemberDto {
  @Field(() => ID)
  readonly id: string;
  @Field(() => RoleEnum)
  readonly role: MemberRoles;
  @Field(() => UserDto)
  readonly user: UserDto;
}
