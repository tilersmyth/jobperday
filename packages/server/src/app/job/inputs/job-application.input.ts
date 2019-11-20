import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class JobApplicationInput {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
}
