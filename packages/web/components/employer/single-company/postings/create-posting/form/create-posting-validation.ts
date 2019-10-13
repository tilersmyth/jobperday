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
    start_date: date()
      .required()
      .typeError('Required'),
    end_date: date()
      .required()
      .typeError('Required'),
    pay_rate: string().required(),
    total_openings: number().required(),
    apply_deadline: date()
      .required()
      .typeError('Required'),
  }),
  newAddressFormatted: string().when('address.addressId', {
    is: '',
    then: string().required('Required'),
  }),
});
