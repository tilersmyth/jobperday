import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import { AutoComplete, Form, Icon } from 'antd';
import PlacesAutocomplete, {
  PropTypes,
  Suggestion,
} from 'react-places-autocomplete';
import { InputProps } from 'antd/lib/input';
import { ValidInputElement } from 'antd/lib/auto-complete';
import { OptionProps } from 'antd/lib/select';

import './style.less';

const { Option } = AutoComplete;

interface Props extends FieldProps {
  handleChange: (value: string) => void;
  handleSelect: (value: string, option: object) => void;
  searchOptions: PropTypes['searchOptions'];
  label?: string;
  showError?: boolean;
  children?:
    | ValidInputElement
    | React.ReactElement<InputProps>
    | React.ReactElement<OptionProps>
    | Array<React.ReactElement<OptionProps>>;
}

const results = (
  loading: boolean,
  error: string,
  suggestions: readonly Suggestion[],
) => {
  if (loading) {
    return [
      <Option key="loading">
        <Icon type="loading" style={{ fontSize: 16 }} spin={true} />
      </Option>,
    ];
  }

  if (error) {
    return [<Option key="error">{error}</Option>];
  }

  return suggestions.map(suggestion => (
    <Option key={suggestion.placeId} value={suggestion.description}>
      {suggestion.description}
    </Option>
  ));
};

export const PlacesAutocompleteInput: React.FunctionComponent<Props> = ({
  field,
  form: { errors, touched },
  handleChange,
  handleSelect,
  searchOptions,
  label,
  showError,
  children,
  ...input
}) => {
  const [resultsError, setResultsError] = useState('');

  const onError = (status: any, clearSuggestions: any) => {
    setResultsError('No results found');
    console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  };

  const inputChange = (value: string) => {
    setResultsError('');
    handleChange(value);
  };

  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      className="google_places_autocomplete"
      label={label}
      validateStatus={error ? 'error' : undefined}
      help={showError && errorMsg}
    >
      <PlacesAutocomplete
        searchOptions={searchOptions}
        value={field.value}
        onChange={inputChange}
        shouldFetchSuggestions={field.value.length > 1}
        onError={onError}
        googleCallbackName="initPlacesApi"
      >
        {({ getInputProps, suggestions, loading }) => {
          const { onChange } = getInputProps();
          const onSearch = (value: string) => onChange({ target: { value } });
          const onSelect = (value: any, object: any) =>
            handleSelect(value as string, object as object);

          return (
            <AutoComplete
              defaultValue={field.value}
              onSelect={onSelect}
              onSearch={onSearch}
              dataSource={results(loading, resultsError, suggestions)}
              {...input}
              children={children}
            />
          );
        }}
      </PlacesAutocomplete>
    </Form.Item>
  );
};
