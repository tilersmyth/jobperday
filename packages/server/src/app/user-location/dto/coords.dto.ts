import { ObjectType, Field, Float } from 'type-graphql';

@ObjectType()
export class UserCoordsDto {
  @Field(() => Float)
  readonly lng: number;
  @Field(() => Float)
  readonly lat: number;
}
