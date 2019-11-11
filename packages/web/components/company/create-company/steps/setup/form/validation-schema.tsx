import { string, object } from 'yup';

export const companySetupSchema = object().shape({
  name: string()
    .min(3, '3 character minimum')
    .required('Required'),
});
