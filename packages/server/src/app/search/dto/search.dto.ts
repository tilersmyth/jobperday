import { ObjectType, Field, Int } from 'type-graphql';

import { SearchResultsDto } from './search-results.dto';

@ObjectType()
export class SearchDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [SearchResultsDto])
  readonly results: SearchResultsDto[];
}
