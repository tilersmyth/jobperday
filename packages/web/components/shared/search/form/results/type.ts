import { SearchQuery } from '../../../../../apollo/generated-components';

export interface SearchResults {
  loading: boolean;
  count: SearchQuery['search']['count'];
  results: SearchQuery['search']['results'];
}
