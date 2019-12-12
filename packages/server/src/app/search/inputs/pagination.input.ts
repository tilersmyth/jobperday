import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SearchPaginationInput {
  @Field(() => Int, { defaultValue: 0 })
  readonly skip: number;
  @Field(() => Int, { defaultValue: 5 })
  readonly take: number;
}
