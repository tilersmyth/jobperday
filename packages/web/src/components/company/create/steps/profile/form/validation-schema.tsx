import { string, object } from 'yup';

export const companyProfileSchema = object().shape({
  profile_image: string().nullable(),
  cover_image: string(),
  about: string().required('Required'),
});
