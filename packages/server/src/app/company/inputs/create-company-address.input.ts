import { InputType, Field, ID } from 'type-graphql';
import { AddressInput } from '../../_helpers/inputs/address.input';

@InputType()
export class CreateCompanyAddressInput {
  @Field(() => ID)
  readonly companyId: string;
  @Field(() => AddressInput)
  readonly address: AddressInput;
}
