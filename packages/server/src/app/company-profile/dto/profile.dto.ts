import { ObjectType, Field, ID } from 'type-graphql';

import { ProfileColorsEnum } from '../enums';

@ObjectType()
export class CompanyProfileDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly about: string;
  @Field()
  readonly cover_image: string;
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field(() => ProfileColorsEnum)
  readonly color: ProfileColorsEnum;
}
