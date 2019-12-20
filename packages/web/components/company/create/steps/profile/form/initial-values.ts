import {
  CompanyProfileInput,
  ProfileColorsEnum,
} from '../../../../../../apollo';

export interface ProfileFormValues extends CompanyProfileInput {
  id?: string;
}

const colorSize = Object.keys(ProfileColorsEnum).length;
const index = Math.round(Math.random() * colorSize);

export const PROFILE_INITIAL_VALUES: ProfileFormValues = {
  about: '',
  profile_image: null,
  cover_image:
    'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_cover.jpg',
  color: Object.values(ProfileColorsEnum)[index],
};
