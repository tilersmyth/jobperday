import { InputType, Field } from 'type-graphql';

@InputType()
export class CompanySlugInput {
  @Field()
  readonly companySlug: string;
}
