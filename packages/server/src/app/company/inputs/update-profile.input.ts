import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateProfileInput {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field({ nullable: true })
  readonly cover_image: string;
  @Field({ nullable: true })
  readonly about: string;
  @Field({ nullable: true })
  readonly business_type: string;
}
