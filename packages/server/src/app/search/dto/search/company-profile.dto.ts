import { ObjectType, Field } from 'type-graphql';

import { ProfileColorsEnum } from '../../../company-profile/enums';

@ObjectType()
export class SearchCompanyProfileDto {
  @Field({ nullable: true })
  readonly profile_image: string;
  @Field(() => ProfileColorsEnum)
  readonly color: ProfileColorsEnum;
}
