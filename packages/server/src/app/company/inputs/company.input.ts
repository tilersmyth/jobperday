import { InputType, Field } from 'type-graphql';

@InputType()
export class CompanyInput {
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
}
