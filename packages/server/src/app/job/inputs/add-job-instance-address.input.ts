import { InputType, Field, ID } from 'type-graphql';

import { AddressInput } from '../../_helpers/inputs/address.input';

@InputType()
export class AddJobInstanceAddressInput {
  @Field()
  readonly companySlug: string;
  @Field(() => ID)
  readonly instanceId: string;
  @Field(() => AddressInput)
  readonly address: AddressInput;
}
