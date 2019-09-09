import { InputType, Field, Int } from 'type-graphql';
import { CoordsInput } from './coords.input';

@InputType()
export class SearchInput {
  @Field(() => Int)
  readonly take: number;
  @Field(() => Int)
  readonly skip: number;
  @Field()
  readonly keyword: string;
  @Field(() => CoordsInput)
  readonly location: CoordsInput;
  @Field(() => Int)
  readonly radius: number;
  @Field(() => Int, { nullable: true })
  readonly pay_rate?: number;
}
