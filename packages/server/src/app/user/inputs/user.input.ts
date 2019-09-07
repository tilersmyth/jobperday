import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UserInput {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
}
