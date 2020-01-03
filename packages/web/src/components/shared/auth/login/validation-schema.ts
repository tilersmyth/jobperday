import { string, object } from 'yup';

export const LoginSchema = object().shape({
  email: string()
    .email()
    .required('Required'),
  password: string()
    .min(8, '8 character minimum')
    .required('Required'),
});
