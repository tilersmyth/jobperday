import { InputType, Field } from 'type-graphql';

import { AddressInput, AddressEntity } from '../../address';

@InputType()
export class CompanyContactInput {
  @Field()
  readonly phone: string;
  @Field(() => AddressInput)
  readonly address: AddressEntity;
}
