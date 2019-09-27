import { ObjectType, Field, ID } from 'type-graphql';

import { JobInstanceDto } from './job-instance.dto';

@ObjectType()
export class JobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly companyName: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly summary: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly keywords: string[];
  @Field(() => [JobInstanceDto])
  readonly instances: JobInstanceDto[];
}
