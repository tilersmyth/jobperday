import React, { useState } from 'react';
import { FieldProps } from 'formik';
import { AutoComplete } from 'antd';
import PlacesAutocomplete, {
  PropTypes,
  Suggestion,
} from 'react-places-autocomplete';
import { InputProps } from 'antd/lib/input';
import { ValidInputElement } from 'antd/lib/auto-complete';
import { OptionProps } from 'antd/lib/select';

import { ErrorBoundary } from '../../error';
import { Icon } from '../../icon';
import styles from './style.less';

const { Option } = AutoComplete;

interface Props extends FieldProps {
  handleSelect: (value: string, option: object) => void;
  searchOptions: PropTypes['searchOptions'];
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
        <Icon type="loader-5-line" style={{ fontSize: 16 }} spin={true} />
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
  handleSelect,
  searchOptions,
  children,
  field,
  form: { setFieldValue },
  ...fieldProps
}) => {
  const [resultsError, setResultsError] = useState('');

  const onError = (status: any, clearSuggestions: any) => {
    setResultsError('No results found');
    console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  };

  const inputChange = (value: string) => {
    setResultsError('');
    setFieldValue(field.name, value);
  };

  return (
    <ErrorBoundary>
      <PlacesAutocomplete
        searchOptions={searchOptions}
        value={field.value}
        onChange={inputChange}
        shouldFetchSuggestions={field.value.length > 1}
        onError={onError}
      >
        {({ getInputProps, suggestions, loading }) => {
          const { onChange } = getInputProps();
          const onSearch = (value: string) => onChange({ target: { value } });
          const onSelect = (value: any, object: any) =>
            handleSelect(value as string, object as object);
          return (
            <AutoComplete
              className={styles.container}
              defaultValue={field.value}
              onSelect={onSelect}
              onSearch={onSearch}
              dataSource={results(loading, resultsError, suggestions)}
              children={children}
              {...fieldProps}
            />
          );
        }}
      </PlacesAutocomplete>
    </ErrorBoundary>
  );
};
