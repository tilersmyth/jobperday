import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateApplicantAnswerInput {
  @Field()
  readonly response: string;
  @Field(() => ID)
  readonly fieldId: string;
}
