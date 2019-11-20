import { string, object, array, ValidationError } from 'yup';

export const jobSchema = object().shape({
  title: string().required('Required'),
  description: string().required('Required'),
  summary: string().required('Required'),
  type: string().required('Required'),
  tags: array().of(string()),
  default_image: string(),
  defaultApplicationId: string().nullable(),
});

export const validationFormatter = ({
  message,
  inner,
}: ValidationError): string => {
  return inner.reduce((acc, err, i) => {
    const detail = `${err.path} ${err.type}`;
    return i < 1 ? `${acc}: ${detail}` : `${acc}, ${detail}`;
  }, message);
};
