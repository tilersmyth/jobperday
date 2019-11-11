import { InputType, Field, ID } from 'type-graphql';

import { UpdateAddressInput, AddressEntity } from '../../address';

@InputType()
export class UpdateCompanyContactInput {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly phone: string;
  @Field(() => UpdateAddressInput)
  readonly address: AddressEntity;
}
