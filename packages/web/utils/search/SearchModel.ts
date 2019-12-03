import {
  SearchInput,
  LocationInput,
  SearchFiltersInput,
  SearchPaginationInput,
} from '../../apollo/generated-components';

export class SearchModel implements SearchInput {
  public search: string = '';
  public location: LocationInput = {
    locality: '',
    coords: {
      lat: 0,
      lng: 0,
    },
  };
  public filters: SearchFiltersInput = {};
  public pagination: SearchPaginationInput = {
    skip: 0,
    take: 5,
  };
}
