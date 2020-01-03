import { string, object } from 'yup';

export const SearchSchema = object().shape({
  location: object().shape({
    locality: string().required('Location must be specified'),
  }),
});
