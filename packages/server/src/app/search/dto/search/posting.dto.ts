import { ObjectType, Field, ID } from 'type-graphql';

import { AddressDto } from '../../../address';
import { SearchCompanyDto } from './company.dto';
import { SearchJobDto } from './job.dto';

@ObjectType()
export class SearchPostingDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly pay_rate: string;
  @Field()
  readonly end_date: Date;
  @Field()
  readonly start_date: Date;
  @Field()
  readonly apply_deadline: Date;
  @Field(() => AddressDto)
  readonly address: AddressDto;
  @Field(() => SearchCompanyDto)
  readonly company: SearchCompanyDto;
  @Field(() => SearchJobDto)
  readonly job: SearchJobDto;
}
