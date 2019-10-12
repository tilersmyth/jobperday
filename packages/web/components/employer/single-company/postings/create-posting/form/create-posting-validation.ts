import { string, number, object, date } from 'yup';

export const createPostingSchema = object().shape({
  jobId: string().required('Required'),
  address: object().shape({
    addressId: string().when('newAddressFormatted', {
      is: undefined,
      then: string().required('Required'),
    }),
  }),
  posting: object().shape({
    start_date: date().required(),
    end_date: date().required(),
    pay_rate: string().required(),
    total_openings: number().required(),
    apply_deadline: date().required(),
  }),
  newAddressFormatted: string().when('address.addressId', {
    is: '',
    then: string().required('Required'),
  }),
});
