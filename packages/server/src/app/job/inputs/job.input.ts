import { InputType, Field } from 'type-graphql';

@InputType()
export class JobInput {
  @Field()
  readonly name: string;
  @Field()
  readonly category: string;
  @Field()
  readonly summary: string;
  @Field()
  readonly description: string;
}
