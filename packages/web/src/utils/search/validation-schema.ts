import { string, number, object } from 'yup';
import { searchFilterOptions } from '@jobperday/common';

export const searchArgsSchema = object().shape({
  search: string().nullable(),
  filters: object().shape({
    radius: string()
      .oneOf(searchFilterOptions.radius.options)
      .nullable(),
    pay_rate: string()
      .oneOf(searchFilterOptions.pay_rate.options)
      .nullable(),
  }),
  pagination: object().shape({}),
  location: object().shape({
    locality: string(),
    coords: object().shape({
      lat: number(),
      lng: number(),
    }),
  }),
});
