import { InputType, Field } from 'type-graphql';

import { ProfileColorsEnum } from '../enums';

@InputType()
export class CompanyProfileInput {
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field()
  readonly cover_image: string;
  @Field()
  readonly about: string;
  @Field(() => ProfileColorsEnum)
  readonly color: ProfileColorsEnum;
}
