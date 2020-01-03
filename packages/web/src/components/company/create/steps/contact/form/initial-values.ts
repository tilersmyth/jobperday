import { CompanyContactInput, AddressInput } from '../../../../../../apollo';

interface ContactFormAddress extends AddressInput {
  id?: string;
}

export interface ContactFormValues extends CompanyContactInput {
  id?: string;
  formatted_address?: string;
  address: ContactFormAddress;
}

export const CONTACT_INITIAL_VALUES: ContactFormValues = {
  phone: '',
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
  formatted_address: '',
};
