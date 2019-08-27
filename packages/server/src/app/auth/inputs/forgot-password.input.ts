import { InputType, Field } from 'type-graphql';

@InputType()
export class ForgotPasswordInput {
  @Field()
  readonly email: string;
}
