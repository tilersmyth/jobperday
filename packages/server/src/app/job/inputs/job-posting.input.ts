import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class JobPostingInput {
  @Field()
  readonly start_date: Date;
  @Field()
  readonly end_date: Date;
  @Field()
  readonly pay_rate: string;
  @Field(() => Int)
  readonly total_openings: number;
  @Field()
  readonly apply_deadline: Date;
}
