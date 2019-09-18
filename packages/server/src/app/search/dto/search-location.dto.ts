import { ObjectType, Field } from 'type-graphql';

import { SearchCoordsDto } from './search-coords.dto';

@ObjectType()
export class SearchLocationDto {
  @Field()
  readonly locality: string;
  @Field(() => SearchCoordsDto)
  readonly coords: SearchCoordsDto;
}
