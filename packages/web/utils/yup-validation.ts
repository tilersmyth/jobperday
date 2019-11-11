import { string, number, object, ref, array } from 'yup';

export const RegisterSchema = object().shape({
  first_name: string()
    .min(3, '3 character minimum')
    .max(50, '50 character maximum')
    .required('Required'),
  last_name: string()
    .min(3, '3 character minimum')
    .max(50, '50 character maximum')
    .required('Required'),
  email: string()
    .email()
    .required('Required'),
  password: string()
    .min(8, '8 character minimum')
    .required('Required'),
  confirm_password: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Required'),
});

export const LoginSchema = object().shape({
  email: string()
    .email()
    .required('Required'),
  password: string()
    .min(8, '8 character minimum')
    .required('Required'),
});

export const ForgotPasswordSchema = object().shape({
  email: string()
    .email()
    .required('Required'),
});

export const SearchSchema = object().shape({
  location: object().shape({
    locality: string().required(),
  }),
});

export const CreateJobSchema = object().shape({
  name: string().required('Required'),
  summary: string().required('Required'),
  description: string().required('Required'),
  type: string().required('Required'),
  keywords: array().of(string()),
});

export const addressSchema = object().shape({
  street: string().required('Required'),
  street2: string(),
  city: string().required('Required'),
  state: string().required('Required'),
  postal_code: string().required('Required'),
  country: string().required('Required'),
  coord_lat: number().required('Required'),
  coord_lng: number().required('Required'),
});
