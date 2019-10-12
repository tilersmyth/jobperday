import {
  AddJobPostingInput,
  AddressInput,
} from '../../../../../../apollo/generated-components';

interface InitialValues extends AddJobPostingInput {
  newAddressFormatted: '';
}

export const initialPostingValues: InitialValues = {
  jobId: '',
  address: {
    addressId: '',
  },
  posting: {
    start_date: '',
    end_date: '',
    pay_rate: '',
    total_openings: 0,
    apply_deadline: '',
  },
  newAddressFormatted: '',
};

export const initialPostingAddressValues: AddressInput = {
  street: '',
  street2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  coord_lat: 0,
  coord_lng: 0,
};
