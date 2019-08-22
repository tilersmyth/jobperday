import { InputType, Field } from 'type-graphql';

import { JobInput } from './job.input';

@InputType()
export class CreateJobInput {
  @Field()
  readonly companySlug: string;
  @Field(() => JobInput)
  readonly job: JobInput;
}
