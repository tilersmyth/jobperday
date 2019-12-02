import { SearchInput, LocationInput } from '../../apollo/generated-components';
import { ParsedUrlQuery } from 'querystring';
import { SearchModel } from './SearchModel';

interface SearchQuery {
  [key: string]: // The value type here is a "poor man's `unknown`". When these types support TypeScript
  // 3.0+, we can replace this with `unknown`.
  {} | null | undefined;
}

export const searchToQuery = (search: SearchInput): SearchQuery => {
  const query: SearchQuery = {
    location: search.location.locality,
  };

  if (search.search) {
    query.search = search.search;
  }

  if (search.filters.radius && search.filters.radius < 200) {
    query.radius = search.filters.radius;
  }

  if (search.filters.pay_rate && search.filters.pay_rate > 0) {
    query.pay_rate = search.filters.pay_rate;
  }

  return query;
};

export const queryToSearch = (
  query: ParsedUrlQuery,
  location?: LocationInput,
): SearchInput => {
  const search = new SearchModel();

  if (location) {
    search.location.locality = location.locality;
    search.location.coords.lat = location.coords.lat;
    search.location.coords.lng = location.coords.lng;
  }

  const searchValue = query.search as string;
  if (searchValue && searchValue.trim()) {
    search.search = searchValue.trim();
  }

  const radius = query.radius as string;
  if (radius) {
    search.filters.radius = parseFloat(radius);
  }

  const pay_rate = query.pay_rate as string;
  if (pay_rate) {
    search.filters.pay_rate = parseFloat(pay_rate);
  }

  return search;
};
