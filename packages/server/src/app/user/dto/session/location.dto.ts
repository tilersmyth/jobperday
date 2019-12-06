import { ObjectType, Field } from 'type-graphql';

import { SessionCoordsDto } from './coords.dto';

@ObjectType()
export class SessionLocationDto {
  @Field()
  readonly locality: string;
  @Field(() => SessionCoordsDto)
  readonly coords: SessionCoordsDto;
}
