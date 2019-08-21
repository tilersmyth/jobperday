import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  readonly name: string;
}
