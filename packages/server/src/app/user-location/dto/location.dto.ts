import { ObjectType, Field } from 'type-graphql';

import { UserCoordsDto } from './coords.dto';

@ObjectType()
export class UserLocationDto {
  @Field()
  readonly locality: string;
  @Field(() => UserCoordsDto)
  readonly coords: UserCoordsDto;
}
