import {
  SearchInput,
  LocationInput,
  SearchOptionsInput,
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
  public options: SearchOptionsInput = {
    radius: 200,
    pay_rate: 0,
  };
  public pagination: SearchPaginationInput = {
    skip: 0,
    take: 2,
  };
}
