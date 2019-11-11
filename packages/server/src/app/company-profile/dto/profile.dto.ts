import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CompanyProfileDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly about: string;
  @Field()
  readonly cover_image: string;
  @Field()
  readonly profile_image: string;
}
