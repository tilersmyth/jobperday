import { InputType, Field } from 'type-graphql';

@InputType()
export class JobInput {
  @Field()
  readonly title: string;
  @Field()
  readonly summary: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => [String], { nullable: true })
  readonly tags: string[];
  @Field()
  readonly default_image: string;
  @Field({ nullable: true })
  readonly defaultApplicationId: string;
}
