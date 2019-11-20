import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateJobInput {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly title: string;
  @Field({ nullable: true })
  readonly summary: string;
  @Field({ nullable: true })
  readonly description: string;
  @Field({ nullable: true })
  readonly type: string;
  @Field(() => [String], { nullable: true })
  readonly tags: string[];
  @Field({ nullable: true })
  readonly default_image: string;
  @Field({ nullable: true })
  readonly defaultApplicationId: string;
}
