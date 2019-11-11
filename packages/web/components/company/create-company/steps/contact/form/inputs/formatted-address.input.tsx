import React from 'react';
import { Input, Form } from 'antd';
import { FieldProps, getIn } from 'formik';
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

interface FieldPropsExt extends FieldProps {
  label: string;
}

export const FormattedAddressInput: React.FunctionComponent<FieldPropsExt> = ({
  label,
  ...formikProps
}) => {
  const { field, form } = formikProps;

  const errorMsg = getIn(form.errors, field.name);
  const error = errorMsg && getIn(form.touched, field.name);

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

  return (
    <Form.Item
      label={label}
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <PlacesAutocompleteInput
        searchOptions={PlacesInputOptions}
        handleSelect={handleSelect}
        {...formikProps}
      >
        <Input />
      </PlacesAutocompleteInput>
    </Form.Item>
  );
};
