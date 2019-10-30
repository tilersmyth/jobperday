import { InputType, Field, ID } from 'type-graphql';

import { JobPostingInput } from './job-posting.input';
import { AddJobPostingAddressInput } from './add-job-posting-address.input';

@InputType()
export class AddJobPostingInput {
  @Field(() => ID)
  readonly jobId: string;
  @Field(() => AddJobPostingAddressInput)
  readonly address: AddJobPostingAddressInput;
  @Field(() => ID)
  readonly applicationId: string;
  @Field(() => JobPostingInput)
  readonly posting: JobPostingInput;
}
