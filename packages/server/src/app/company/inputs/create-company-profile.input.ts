import { InputType, Field } from 'type-graphql';

import { CompanyProfileInput } from './company-profile.input';

@InputType()
export class CreateCompanyProfileInput {
  @Field()
  readonly companySlug: string;
  @Field(() => CompanyProfileInput)
  readonly profile: CompanyProfileInput;
}
