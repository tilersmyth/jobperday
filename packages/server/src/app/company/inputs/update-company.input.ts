import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateCompanyInput {
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly slug: string;
  @Field({ nullable: true })
  readonly type: string;
}
