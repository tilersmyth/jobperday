import { ObjectType, Field, ID } from 'type-graphql';

import { PostingCompanyProfileDto } from './company-profile.dto';

@ObjectType()
export class PostingCompanyDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => PostingCompanyProfileDto)
  readonly profile: PostingCompanyProfileDto;
}
