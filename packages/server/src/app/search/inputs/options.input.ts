import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SearchOptionsInput {
  @Field(() => Int)
  readonly radius: number;
  @Field(() => Int)
  readonly pay_rate: number;
}
