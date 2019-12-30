import { registerEnumType } from 'type-graphql';

export enum PostingStatusEnum {
  OPEN,
  CLOSED,
}

registerEnumType(PostingStatusEnum, {
  name: 'PostingStatusEnum',
});
