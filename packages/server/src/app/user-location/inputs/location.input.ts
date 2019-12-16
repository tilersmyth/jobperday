import { InputType, Field } from 'type-graphql';
import { CoordsInput } from './coords.input';

@InputType()
export class LocationInput {
  @Field()
  readonly locality: string;
  @Field(() => CoordsInput)
  readonly coords: CoordsInput;
}
