import React from 'react';
import {
  PropTypes,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { FieldProps, getIn } from 'formik';

import {
  PlacesAutocompleteInput,
  googleAddressParser,
} from '../../../../../shared/input/places-input';
import { initialPostingAddressValues } from '../../initial-posting-values';
import { addressSchema } from '../../../../../../utils/yup-validation';
import { Form } from 'antd';

const PlacesInputOptions: PropTypes['searchOptions'] = {
  types: ['address'],
  componentRestrictions: { country: 'us' },
};

export const SelectGooglePlacesInput: React.FunctionComponent<FieldProps> = ({
  field,
  form,
  ...inputProps
}) => {
  const { setFieldValue } = form;

  const errorMsg = getIn(form.errors, field.name);
  const error = errorMsg && getIn(form.touched, field.name);

  const HandlePlacesInputSelect = async (value: string) => {
    const geo = await geocodeByAddress(value);
    const coords = await getLatLng(geo[0]);
    const address = googleAddressParser(initialPostingAddressValues, geo);
    address.coord_lat = coords.lat;
    address.coord_lng = coords.lng;
    try {
      await addressSchema.validate(address);
      setFieldValue('address.newAddress', address);
    } catch (error) {
      console.log(error);
    }
  };

  const { children, ...rest } = inputProps;

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <PlacesAutocompleteInput
        field={field}
        form={form}
        searchOptions={PlacesInputOptions}
        handleSelect={HandlePlacesInputSelect}
        {...rest}
      />
    </Form.Item>
  );
};
