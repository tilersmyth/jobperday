import { InputType, Field, ID } from 'type-graphql';

import { AddressInput } from '../../_helpers/inputs/address.input';

@InputType()
export class AddJobPostingAddressInput {
  @Field(() => ID, { nullable: true })
  readonly addressId: string;
  @Field(() => AddressInput, { nullable: true })
  readonly newAddress: AddressInput;
}
