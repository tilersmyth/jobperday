import { string, number, object, date, ref } from 'yup';

export const createPostingSchema = object().shape({
  jobId: string().required('Required'),
  posting: object().shape({
    start_date: date()
      .required()
      .typeError('Required'),
    end_date: date()
      .min(ref('start_date'), 'must occur after start')
      .required()
      .typeError('Required'),
    pay_rate: string().required(),
    total_openings: number().required(),
    apply_deadline: date()
      .max(ref('start_date'), 'must occur before start')
      .required()
      .typeError('Required'),
  }),
  addressFormatted: string().required('Required'),
});
