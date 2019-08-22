import { InputType, Field, ID } from 'type-graphql';

import { JobInstanceInput } from './job-instance.input';

@InputType()
export class AddJobInstanceInput {
  @Field()
  readonly companySlug: string;
  @Field(() => ID)
  readonly jobId: string;
  @Field(() => JobInstanceInput)
  readonly instance: JobInstanceInput;
}
