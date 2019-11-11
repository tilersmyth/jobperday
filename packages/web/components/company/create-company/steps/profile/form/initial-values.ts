import { CompanyProfileInput } from '../../../../../../apollo';

interface DefaultImages {
  profile_image: string;
  cover_image: string;
}

export interface ProfileFormValues extends CompanyProfileInput {
  id?: string;
}

export const PROFILE_DEFAULT_IMAGES: DefaultImages = {
  profile_image:
    'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_profile.png',
  cover_image:
    'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_cover.jpg',
};

export const PROFILE_INITIAL_VALUES: ProfileFormValues = {
  about: '',
  profile_image: '',
  cover_image: '',
};
