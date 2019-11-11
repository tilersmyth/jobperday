import { string, object } from 'yup';

export const companyProfileSchema = object().shape({
  profile_image: string(),
  cover_image: string(),
  about: string().required('Required'),
});
