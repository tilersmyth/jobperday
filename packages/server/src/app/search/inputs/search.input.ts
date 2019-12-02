import { InputType, Field } from 'type-graphql';

import { LocationInput } from './location.input';
import { SearchPaginationInput } from './pagination.input';
import { SearchFiltersInput } from './filters.input';

@InputType()
export class SearchInput {
  @Field()
  readonly search: string;
  @Field(() => LocationInput)
  readonly location: LocationInput;
  @Field(() => SearchFiltersInput)
  readonly filters: SearchFiltersInput;
  @Field(() => SearchPaginationInput)
  readonly pagination: SearchPaginationInput;
}
