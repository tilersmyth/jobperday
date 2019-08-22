import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class JobInstanceInput {
  @Field()
  readonly date: Date;
  @Field()
  readonly start_time: string;
  @Field()
  readonly end_time: string;
  @Field()
  readonly pay_rate: string;
  @Field(() => Int)
  readonly total_openings: number;
  @Field()
  readonly apply_deadline: Date;
}
