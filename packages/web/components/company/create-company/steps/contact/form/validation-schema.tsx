import { string, object } from 'yup';

import { addressSchema } from '../../../../../../utils/yup-validation';

export const companyContactSchema = object().shape({
  phone: string().required('Required'),
  address: addressSchema,
  formatted_address: string()
    .when('address.street', {
      is: '',
      then: string().required('Required'),
    })
    .nullable(),
});
