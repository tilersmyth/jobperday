import { ObjectType, Field, Int } from 'type-graphql';

import { JobPostingDto } from './posting.dto';
import { JobPostingEntity } from '../entity';

@ObjectType()
export class JobPostingResultsDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [JobPostingDto])
  readonly postings: JobPostingEntity[];
}
