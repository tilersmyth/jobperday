import { InputType, Field, ID } from 'type-graphql';
import { MemberRoles } from '@jobperday/common';

import { MemberRolesEnum } from '../enums';

@InputType()
export class CompanyMemberInput {
  @Field(() => ID)
  readonly userId: string;
  @Field(() => MemberRolesEnum)
  readonly role: MemberRoles;
  @Field({ nullable: true })
  readonly confirmed: boolean;
}
