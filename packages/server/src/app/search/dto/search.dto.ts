import { ObjectType, Field, Int } from 'type-graphql';

import { SearchResultListDto } from './result-list';

@ObjectType()
export class SearchDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [SearchResultListDto])
  readonly results: SearchResultListDto[];
}
