interface FilterOption {
  options: string[];
  default: string;
}

interface SearchFilterOptions {
  radius: FilterOption;
  pay_rate: FilterOption;
}

export const searchFilterOptions: SearchFilterOptions = {
  radius: { options: ['20', '50', '100'], default: '200' },
  pay_rate: { options: ['15', '20', '25', '30'], default: '0' },
};
