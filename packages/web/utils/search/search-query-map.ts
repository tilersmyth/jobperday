import { searchFilterOptions } from '@jobperday/common';

import { SearchInput } from '../../apollo/generated-components';
import { SearchModel } from './SearchModel';

export const searchToQuery = (
  search: SearchInput,
): {
  [key: string]: string;
} => {
  const query: {
    [key: string]: string;
  } = {
    location: search.location.locality,
  };

  if (search.search) {
    query.search = search.search;
  }

  if (search.filters) {
    if (
      search.filters.radius &&
      parseInt(search.filters.radius, 10) <
        parseInt(searchFilterOptions.radius.default, 10)
    ) {
      query.radius = search.filters.radius;
    }

    if (
      search.filters.pay_rate &&
      parseInt(search.filters.pay_rate, 10) >
        parseInt(searchFilterOptions.pay_rate.default, 10)
    ) {
      query.pay_rate = search.filters.pay_rate;
    }
  }

  return query;
};

export const queryToSearch = (query: {
  [key: string]: string;
}): SearchInput => {
  return Object.keys(query).reduce((acc: SearchInput, prop: string) => {
    if (query[prop].trim()) {
      if (prop === 'search') {
        return { [prop]: query[prop], ...acc };
      }

      if (Object.keys(searchFilterOptions).includes(prop)) {
        return {
          ...acc,
          filters: { [prop]: query[prop], ...acc.filters },
        };
      }
    }

    return acc;
  }, new SearchModel());
};
