import React, { useState } from 'react';
import { AutoComplete, Icon, Form } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from 'react-places-autocomplete';

const { Option } = AutoComplete;

const results = (
  loading: boolean,
  error: string,
  suggestions: readonly Suggestion[],
) => {
  if (loading) {
    return (
      <Option key="loading">
        <Icon type="loading" style={{ fontSize: 16 }} spin={true} />
      </Option>
    );
  }

  if (error) {
    return <Option key="error">{error}</Option>;
  }

  return suggestions.map(suggestion => (
    <Option key={suggestion.id} value={suggestion.description}>
      {suggestion.description}
    </Option>
  ));
};

export const LocationInput: React.FunctionComponent = ({
  field,
  form: { errors, touched },
  setFieldValue,
}: any) => {
  const inputError = touched[field.name] && errors[field.name];

  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleChange = (value: any) => {
    setError('');
    setAddress(value);
  };

  const handleSelect = async (value: any) => {
    try {
      const geo = await geocodeByAddress(value);
      console.log(geo);
      const coords = await getLatLng(geo[0]);
      setFieldValue('lat', coords.lat);
      setFieldValue('lng', coords.lng);
      console.log('Success', coords);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const onError = (status: any, clearSuggestions: any) => {
    setError('No results found');
    console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  };

  return (
    <Form.Item validateStatus={inputError ? 'error' : undefined}>
      <PlacesAutocomplete
        searchOptions={{
          types: ['geocode'],
          componentRestrictions: { country: 'us' },
        }}
        value={address}
        onChange={handleChange}
        shouldFetchSuggestions={address.length > 1}
        onError={onError}
      >
        {({ getInputProps, suggestions, loading }) => {
          const { onChange } = getInputProps();

          return (
            <AutoComplete
              size="large"
              onSelect={handleSelect}
              onSearch={(value: any) => onChange({ target: { value } })}
              placeholder="City, state or zip"
            >
              {results(loading, error, suggestions)}
            </AutoComplete>
          );
        }}
      </PlacesAutocomplete>
    </Form.Item>
  );
};
