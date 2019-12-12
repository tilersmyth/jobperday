import { InputType, Field } from 'type-graphql';
import { searchFilterOptions } from '@jobperday/common';

@InputType()
export class SearchFiltersInput {
  @Field({ defaultValue: searchFilterOptions.radius.default })
  readonly radius: string;
  @Field({ defaultValue: searchFilterOptions.pay_rate.default })
  readonly pay_rate: string;
}
