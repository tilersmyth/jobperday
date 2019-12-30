import { registerEnumType } from 'type-graphql';

export enum PostingFilterSortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(PostingFilterSortEnum, {
  name: 'PostingFilterSortEnum',
});
