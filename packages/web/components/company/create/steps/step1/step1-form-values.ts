interface FormAddressValues {
  phone: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  coord_lat: number;
  coord_lng: number;
}

interface FormValues {
  name: string;
  formatted_address: string;
  address: FormAddressValues;
}

export const STEP1_FORM_VALUES: FormValues = {
  name: '',
  formatted_address: '',
  address: {
    phone: '',
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
