import { InputType, Field } from 'type-graphql';

import { UpdateProfileInput } from './update-profile.input';

@InputType()
export class UpdateCompanyProfileInput {
  @Field()
  readonly companySlug: string;
  @Field(() => UpdateProfileInput)
  readonly profile: UpdateProfileInput;
}
