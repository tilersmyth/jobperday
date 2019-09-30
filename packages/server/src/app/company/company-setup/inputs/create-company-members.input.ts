import { InputType, Field } from 'type-graphql';

import { CompanyMemberInput } from './company-member.input';

@InputType()
export class CreateCompanyMembersInput {
  @Field()
  readonly companySlug: string;
  @Field(() => [CompanyMemberInput])
  readonly members: CompanyMemberInput[];
}
