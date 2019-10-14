import { CreateCompanyInput } from '../../../../../../apollo/generated-components';

interface FormValues extends CreateCompanyInput {
  formatted_address: string;
}

export const STEP1_FORM_VALUES: FormValues = {
  name: '',
  slug: '',
  phone: '',
  formatted_address: '',
  address: {
    street: '',
    street2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    coord_lat: 0,
    coord_lng: 0,
  },
};
