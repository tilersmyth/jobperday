import { InputType, Field } from 'type-graphql';
import { AddressInput } from '../../_helpers/inputs/address.input';

@InputType()
export class CreateCompanyAddressInput {
  @Field()
  readonly companySlug: string;
  @Field(() => AddressInput)
  readonly address: AddressInput;
}
