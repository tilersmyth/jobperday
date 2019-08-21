import { InputType, Field } from 'type-graphql';

@InputType()
export class CompanyProfileInput {
  @Field()
  readonly profile_image: string;
  @Field()
  readonly cover_image: string;
  @Field()
  readonly about: string;
  @Field()
  readonly business_type: string;
}
