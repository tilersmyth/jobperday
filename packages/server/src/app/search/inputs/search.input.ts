import { InputType, Field, Int } from 'type-graphql';
import { LocationInput } from './location.input';
import { SearchOptionsInput } from './options.input';
import { SearchPaginationInput } from './pagination.input';

@InputType()
export class SearchInput {
  @Field()
  readonly search: string;
  @Field(() => LocationInput)
  readonly location: LocationInput;
  @Field(() => SearchOptionsInput)
  readonly options: SearchOptionsInput;
  @Field(() => SearchPaginationInput)
  readonly pagination: SearchPaginationInput;
}
