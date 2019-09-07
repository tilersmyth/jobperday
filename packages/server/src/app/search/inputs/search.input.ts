import { InputType, Field, Int } from 'type-graphql';
import { CoordsInput } from './coords.input';

@InputType()
export class SearchInput {
  @Field()
  readonly keyword: string;
  @Field(() => CoordsInput)
  readonly location: CoordsInput;
  @Field(() => Int)
  readonly radius: number;
}
