import { InputType, Field, ID } from 'type-graphql';

import { CreateApplicantAnswerInput } from './create-answer';

@InputType()
export class CreateApplicantInput {
  @Field(() => ID)
  readonly companyId: string;
  @Field(() => ID)
  readonly jobId: string;
  @Field(() => ID)
  readonly postingId: string;
  @Field(() => [CreateApplicantAnswerInput])
  readonly answers: CreateApplicantAnswerInput[];
}
