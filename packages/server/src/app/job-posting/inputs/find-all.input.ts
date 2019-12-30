import { InputType, Field } from 'type-graphql';

import { PostingStatusEnum } from '../enums';
import { PostingsFilterInput } from './find-all/filters.input';
import { PostingPaginationInput } from './find-all/pagination.input';

@InputType()
export class FindAllPostingsInput {
  @Field(() => PostingStatusEnum)
  readonly status: PostingStatusEnum;
  @Field(() => PostingsFilterInput)
  readonly filter: PostingsFilterInput;
  @Field(() => PostingPaginationInput)
  readonly pagination: PostingPaginationInput;
}
