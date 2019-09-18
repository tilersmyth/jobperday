import { ObjectType, Field, ID } from 'type-graphql';

import { SearchLocationDto } from '../../search/dto/search-location.dto';

@ObjectType()
export class MeSessionDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly realm: string;
  @Field()
  readonly is_verified: boolean;
  @Field(() => [String])
  readonly setup: string[];
  @Field()
  readonly created_at: Date;
  @Field(() => SearchLocationDto, { nullable: true })
  readonly search?: SearchLocationDto;
}
