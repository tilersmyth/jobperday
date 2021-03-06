import { ObjectType, Field, ID, Int } from 'type-graphql';

import { JobDto } from '../../job/dto/job.dto';

@ObjectType()
export class JobPostingDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly active: boolean;
  @Field()
  readonly start_date: Date;
  @Field()
  readonly end_date: Date;
  @Field(() => Int)
  readonly pay_rate: number;
  @Field(() => Int)
  readonly total_openings: number;
  @Field(() => Int)
  readonly remaining_openings: number;
  @Field()
  readonly apply_deadline: Date;
  @Field(() => JobDto)
  readonly job: JobDto;
}
