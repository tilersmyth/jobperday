import { ObjectType, Field, Float } from 'type-graphql';

import { SearchPostingDto } from './posting.dto';

@ObjectType()
export class SearchResultDto {
  @Field(() => SearchPostingDto)
  readonly posting: SearchPostingDto;
  @Field(() => Float)
  readonly rank: number;
}
