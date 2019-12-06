import { ObjectType, Field, ID, Int } from 'type-graphql';

import { AddressDto } from '../../../address';
import { PostingCompanyDto } from './company.dto';
import { PostingJobDto } from './job.dto';

@ObjectType()
export class PostingDto {
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
  @Field(() => Int)
  readonly remaining_openings: number;
  @Field(() => ID)
  readonly applicationId: string;
  @Field(() => AddressDto)
  readonly address: AddressDto;
  @Field(() => PostingCompanyDto)
  readonly company: PostingCompanyDto;
  @Field(() => PostingJobDto)
  readonly job: PostingJobDto;
}
