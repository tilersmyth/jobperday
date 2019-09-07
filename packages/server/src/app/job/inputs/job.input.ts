import { InputType, Field } from 'type-graphql';

@InputType()
export class JobInput {
  @Field()
  readonly name: string;
  @Field()
  readonly summary: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => [String], { nullable: true })
  readonly keywords: string[];
}
