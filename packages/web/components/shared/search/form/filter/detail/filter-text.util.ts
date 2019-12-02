import { SearchInput } from '../../../../../../apollo';

interface SearchFilterText {
  title: string;
  detail: string;
}

export const searchFilterText = (
  arg: string,
  filters: SearchInput['filters'],
): SearchFilterText => {
  switch (arg) {
    case 'radius':
      return { title: 'Distance', detail: `within ${filters.radius} miles` };
    case 'pay_rate':
      return { title: 'Hourly rate', detail: `$${filters.pay_rate}+` };
    default:
      throw Error('Unrecognized search filter');
  }
};
