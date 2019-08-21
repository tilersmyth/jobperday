import { InputType, Field } from 'type-graphql';

@InputType()
export class RefreshTokenInput {
  @Field()
  readonly token: string;
}
