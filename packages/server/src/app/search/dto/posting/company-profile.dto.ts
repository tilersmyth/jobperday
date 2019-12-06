import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class PostingCompanyProfileDto {
  @Field()
  readonly profile_image: string;
}
