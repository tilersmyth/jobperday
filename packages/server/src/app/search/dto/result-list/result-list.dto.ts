import { ObjectType, Field, Float } from 'type-graphql';

import { SearchJobDto } from './job.dto';

@ObjectType()
export class SearchResultListDto {
  @Field(() => SearchJobDto)
  readonly job: SearchJobDto;
  @Field(() => Float)
  readonly rank: number;
}
