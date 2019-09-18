import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SearchPaginationInput {
  @Field(() => Int)
  readonly skip: number;
  @Field(() => Int)
  readonly take: number;
}
