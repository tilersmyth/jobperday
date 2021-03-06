import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';
import {
  PropTypes,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { PlacesAutocompleteInput } from '../../../../input/places-input';
import { Icon } from '../../../../icon';

const PlacesInputOptions: PropTypes['searchOptions'] = {
  types: ['geocode'],
  componentRestrictions: { country: 'us' },
};

export const SearchLocationInput = (props: FieldProps) => {
  const {
    field,
    form: { errors, touched, setFieldValue },
  } = props;

  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  const HandlePlacesInputSelect = async (value: string) => {
    try {
      const geo = await geocodeByAddress(value);
      const coords = await getLatLng(geo[0]);

      setFieldValue('location', {
        locality: value,
        coords,
      });
      console.log('Success', coords);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Form.Item
      className="autocomplete-has-icon"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
      style={{ marginBottom: 0 }}
    >
      <PlacesAutocompleteInput
        searchOptions={PlacesInputOptions}
        handleSelect={HandlePlacesInputSelect}
        {...props}
      >
        <Input
          prefix={
            <Icon type="map-pin-2-line" style={{ color: 'rgba(0,0,0,.25)' }} />
          }
        />
      </PlacesAutocompleteInput>
    </Form.Item>
  );
};
