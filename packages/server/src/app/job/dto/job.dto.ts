import { ObjectType, Field, ID } from 'type-graphql';

import { JobPostingDto } from './job-posting.dto';

@ObjectType()
export class JobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly summary: string;
  @Field()
  readonly description: string;
  @Field()
  readonly created_at: Date;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly default_image: string;
  @Field({ nullable: true })
  readonly defaultApplicationId: string;
  @Field(() => [JobPostingDto])
  readonly postings: JobPostingDto[];
}
