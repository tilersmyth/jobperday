import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, '3 character minimum')
    .max(50, '50 character maximum')
    .required('Required'),
  last_name: Yup.string()
    .min(3, '3 character minimum')
    .max(50, '50 character maximum')
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .min(8, '8 character minimum')
    .required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .min(8, '8 character minimum')
    .required('Required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
});

export const SearchSchema = Yup.object().shape({
  location: Yup.object().shape({
    locality: Yup.string().required(),
  }),
});

export const CreateCompanySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, '3 character minimum')
    .required('Required'),
  address: Yup.object().shape({
    phone: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    postal_code: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    coord_lat: Yup.number().required(),
    coord_lng: Yup.number().required(),
  }),
  formatted_address: Yup.string().when('address.street', {
    is: '',
    then: Yup.string().required('Required'),
  }),
});

export const CreateCompanyProfileSchema = Yup.object().shape({
  business_type: Yup.string().required('Required'),
  about: Yup.string().required('Required'),
});
