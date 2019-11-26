import { ObjectType, Field, Int } from 'type-graphql';

import { AddressDto } from '../../../address';

@ObjectType()
export class SearchJobPostingDto {
  @Field()
  readonly pay_rate: string;
  @Field()
  readonly end_date: Date;
  @Field()
  readonly start_date: Date;
  @Field()
  readonly apply_deadline: Date;
  @Field(() => Int)
  readonly remaining_openings: number;
  @Field(() => AddressDto)
  readonly address: AddressDto;
}
