import { InputType, Field, Int } from 'type-graphql';

import { postingPaginationConfig } from '@jobperday/common';

@InputType()
export class PostingPaginationInput {
  @Field(() => Int, { defaultValue: postingPaginationConfig.skip })
  readonly skip: number;
  @Field(() => Int, { defaultValue: postingPaginationConfig.limit })
  readonly limit: number;
}
