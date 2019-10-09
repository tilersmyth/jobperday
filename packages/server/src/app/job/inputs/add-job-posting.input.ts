import { InputType, Field, ID } from 'type-graphql';

import { JobPostingInput } from './job-posting.input';

@InputType()
export class AddJobPostingInput {
  @Field()
  readonly companySlug: string;
  @Field(() => ID)
  readonly jobId: string;
  @Field(() => JobPostingInput)
  readonly posting: JobPostingInput;
}
