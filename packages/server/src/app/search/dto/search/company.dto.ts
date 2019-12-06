import { ObjectType, Field, ID } from 'type-graphql';

import { SearchCompanyProfileDto } from './company-profile.dto';

@ObjectType()
export class SearchCompanyDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => SearchCompanyProfileDto)
  readonly profile: SearchCompanyProfileDto;
}
