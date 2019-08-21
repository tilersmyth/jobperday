import { InputType, Field, ID } from 'type-graphql';

import { CompanyProfileInput } from './company-profile.input';

@InputType()
export class CreateCompanyProfileInput {
  @Field(() => ID)
  readonly companyId: string;
  @Field(() => CompanyProfileInput)
  readonly profile: CompanyProfileInput;
}
