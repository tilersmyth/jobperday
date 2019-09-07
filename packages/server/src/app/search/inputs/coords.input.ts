import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class CoordsInput {
  @Field(() => Float)
  readonly lat: number;
  @Field(() => Float)
  readonly lng: number;
}
