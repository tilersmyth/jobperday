import { ObjectType, Field, Int } from 'type-graphql';

import { SearchResultDto } from './result.dto';

@ObjectType()
export class SearchDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [SearchResultDto])
  readonly results: SearchResultDto[];
}
