import { InputType, Field } from 'type-graphql';

import { UpdateCompanyAddressInput } from './update-company-address.input';

@InputType()
export class UpdateCompanyInput {
  @Field()
  readonly companySlug: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly slug: string;
  @Field(() => UpdateCompanyAddressInput, { nullable: true })
  readonly address: UpdateCompanyAddressInput;
}
