import { InputType, Field, Int } from 'type-graphql';
import { searchPaginationDefault } from '@jobperday/common';

@InputType()
export class SearchPaginationInput {
  @Field(() => Int, { defaultValue: searchPaginationDefault.skip })
  readonly skip: number;
  @Field(() => Int, { defaultValue: searchPaginationDefault.limit })
  readonly take: number;
}
