import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class PostingCountDto {
  @Field(() => Int)
  readonly open: number;
  @Field(() => Int)
  readonly closed: number;
}
