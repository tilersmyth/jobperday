import React from 'react';
import {
  PropTypes,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { FieldProps } from 'formik';

import {
  PlacesAutocompleteInput,
  googleAddressParser,
} from '../../../../../../../shared/input/places-input';
import { initialPostingAddressValues } from '../../initial-posting-values';
import { addressSchema } from '../../../../../../../../utils/yup-validation';

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
    <PlacesAutocompleteInput
      field={field}
      form={form}
      searchOptions={PlacesInputOptions}
      handleChange={(value: string) => setFieldValue(field.name, value)}
      handleSelect={HandlePlacesInputSelect}
      showError={true}
      {...rest}
    />
  );
};
