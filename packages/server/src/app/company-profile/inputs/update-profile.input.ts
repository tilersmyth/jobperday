import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateCompanyProfileInput {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field({ nullable: true })
  readonly cover_image: string;
  @Field({ nullable: true })
  readonly about: string;
}
