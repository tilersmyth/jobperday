import { ObjectType, Field, ID, Int } from 'type-graphql';

import { JobPostingDto } from './job-posting.dto';
import { JobPostingEntity } from '../entity';

@ObjectType()
export class JobPostingResultsDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [JobPostingDto])
  readonly postings: JobPostingEntity[];
}
