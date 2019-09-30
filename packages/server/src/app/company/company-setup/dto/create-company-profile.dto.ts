import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CreateCompanyProfileDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly business_type: string;
  @Field()
  readonly about: string;
  @Field()
  readonly profile_image: string;
}
