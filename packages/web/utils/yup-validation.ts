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
