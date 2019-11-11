import { ObjectType, Field, ID } from 'type-graphql';

import { AddressDto, AddressEntity } from '../../address';

@ObjectType()
export class CompanyContactDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly phone: string;
  @Field(() => AddressDto)
  readonly address: AddressEntity;
}
