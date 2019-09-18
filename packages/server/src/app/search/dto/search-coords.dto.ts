import { ObjectType, Field, Float } from 'type-graphql';

@ObjectType()
export class SearchCoordsDto {
  @Field(() => Float)
  readonly lng: number;
  @Field(() => Float)
  readonly lat: number;
}
