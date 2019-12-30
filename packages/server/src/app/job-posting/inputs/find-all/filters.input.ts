import { InputType, Field } from 'type-graphql';

import { PostingFilterSortEnum } from '../../enums/sort.enum';

@InputType()
export class PostingsFilterInput {
  @Field(() => PostingFilterSortEnum, {
    defaultValue: PostingFilterSortEnum.DESC,
  })
  readonly sort: PostingFilterSortEnum;
}
