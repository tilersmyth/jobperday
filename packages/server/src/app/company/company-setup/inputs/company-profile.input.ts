import { InputType, Field } from 'type-graphql';

@InputType()
export class CompanyProfileInput {
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field({ nullable: true })
  readonly cover_image: string;
  @Field()
  readonly about: string;
  @Field()
  readonly business_type: string;
}
