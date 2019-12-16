import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class CoordsInput {
  @Field(() => Float)
  readonly lng: number;
  @Field(() => Float)
  readonly lat: number;
}
