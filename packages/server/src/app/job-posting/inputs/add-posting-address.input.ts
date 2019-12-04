import { InputType, Field, ID } from 'type-graphql';

import { AddressInput2 } from '../../_helpers/inputs/address.input';

@InputType()
export class AddJobPostingAddressInput {
  @Field(() => ID, { nullable: true })
  readonly addressId: string;
  @Field(() => AddressInput2, { nullable: true })
  readonly newAddress: AddressInput2;
}
