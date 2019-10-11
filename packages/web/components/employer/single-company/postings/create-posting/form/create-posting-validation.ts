import { string, number, object, date } from 'yup';

export const createPostingSchema = object().shape({
  jobId: string().required('Required'),
  address: object().shape({
    addressId: string(),
    addAddress: object().when('address.addressId', {
      is: '',
      then: object({
        phone: string().required('Required'),
        street: string().required('Required'),
        street2: string(),
        city: string().required('Required'),
        state: string().required('Required'),
        postal_code: string().required('Required'),
        country: string().required('Required'),
        coord_lat: number().required(),
        coord_lng: number().required(),
      }),
    }),
    posting: object().shape({
      start_date: date().required(),
      end_date: date().required(),
      pay_rate: string().required(),
      total_openings: number().required(),
      apply_deadline: date().required(),
    }),
  }),
});
