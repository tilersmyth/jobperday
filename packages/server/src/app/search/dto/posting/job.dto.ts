import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class PostingJobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly default_image: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly tags: string[];
}
