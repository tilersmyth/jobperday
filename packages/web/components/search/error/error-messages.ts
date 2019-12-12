import { SearchErrorEnum } from './search-error.enum';

export const errorMessages = (error: SearchErrorEnum) => {
  switch (error) {
    case SearchErrorEnum.INVALID_FILTER:
      return 'invalid filter in url';
    case SearchErrorEnum.NO_LOCATION:
      return 'location required for search';
    case SearchErrorEnum.INVALID_LOCATION:
      return 'invalid location provided';
    default:
      return 'unknown error';
  }
};
