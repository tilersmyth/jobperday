import { InputType, Field } from 'type-graphql';

import { CreateCompanyAddressInput } from './create-company-address.input';

@InputType()
export class CreateCompanyInput {
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly phone: string;
  @Field(() => CreateCompanyAddressInput)
  readonly address: CreateCompanyAddressInput;
}
