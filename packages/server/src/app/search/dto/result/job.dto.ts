import { ObjectType, Field, ID } from 'type-graphql';

import { SearchJobDto } from '../result-list/job.dto';

@ObjectType()
export class SearchJobResultDto extends SearchJobDto {
  @Field()
  readonly default_image: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly tags: string[];
}
