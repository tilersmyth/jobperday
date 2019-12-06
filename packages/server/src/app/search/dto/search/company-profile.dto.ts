import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class SearchCompanyProfileDto {
  @Field()
  readonly profile_image: string;
}
