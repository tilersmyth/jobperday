import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SearchFiltersInput {
  @Field(() => Int, { defaultValue: 200 })
  readonly radius: number;
  @Field(() => Int, { defaultValue: 0 })
  readonly pay_rate: number;
}
