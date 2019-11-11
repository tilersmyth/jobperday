import React from 'react';
import { Input } from 'antd';
import { FieldProps } from 'formik';
import {
  PropTypes,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import {
  PlacesAutocompleteInput,
  googleAddressParser,
} from '../../../../../../shared/input/places-input';
import { CONTACT_INITIAL_VALUES } from '../initial-values';
import { addressSchema } from '../../../../../../../utils/yup-validation';

const PlacesInputOptions: PropTypes['searchOptions'] = {
  types: ['address'],
  componentRestrictions: { country: 'us' },
};

export const FormattedAddressInput: React.FunctionComponent<FieldProps> = ({
  field,
  form,
}) => {
  const handleSelect = async (value: string) => {
    form.setFieldValue(field.name, value);

    const geo = await geocodeByAddress(value);
    const coords = await getLatLng(geo[0]);

    const address = googleAddressParser(CONTACT_INITIAL_VALUES.address, geo);
    address.coord_lat = coords.lat;
    address.coord_lng = coords.lng;

    try {
      await addressSchema.validate(address);
      form.setFieldValue('address', address);
      form.setFieldValue(field.name, null);
    } catch (error) {
      const { path } = error.params;
      console.log('error', path);
      form.setFieldValue(field.name, '');
    }
  };

  const inputProps = {
    size: 'large',
    placeholder: 'Address',
  };

  return (
    <PlacesAutocompleteInput
      field={field}
      form={form}
      {...inputProps}
      searchOptions={PlacesInputOptions}
      handleChange={value => form.setFieldValue(field.name, value)}
      handleSelect={handleSelect}
      showError={true}
    >
      <Input />
    </PlacesAutocompleteInput>
  );
};
