import { InputType, Field, ID } from 'type-graphql';

import { MemberRoles } from '../../../types';

@InputType()
export class CompanyMemberInput {
  @Field(() => ID, { nullable: true })
  readonly userId: string;
  @Field()
  readonly email: string;
  @Field()
  readonly role: MemberRoles;
}
