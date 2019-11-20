import {
  AddJobPostingInput,
  AddressInput,
} from '../../../../apollo/generated-components';

export interface PostingInitialValues extends AddJobPostingInput {
  addressFormatted: '';
}

export const initialPostingValues: PostingInitialValues = {
  jobId: '',
  applicationId: '',
  address: {
    addressId: '',
  },
  posting: {
    active: true,
    start_date: '',
    end_date: '',
    pay_rate: '15',
    total_openings: 1,
    apply_deadline: '',
  },
  addressFormatted: '',
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
