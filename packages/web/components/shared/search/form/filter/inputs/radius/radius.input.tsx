import React from 'react';
import { Radio, Icon } from 'antd';
import { FieldProps } from 'formik';
import { searchFilterOptions } from '@jobperday/common';

import { SearchInput } from '../../../../../../../apollo';
import styles from './style.less';

export const FilterRadiusInput: React.FunctionComponent<FieldProps<
  SearchInput
>> = ({ field, form: { setFieldValue, handleSubmit } }) => {
  const clear = () => {
    setFieldValue(field.name, undefined);
    handleSubmit();
  };

  return (
    <Radio.Group
      onChange={e => {
        setFieldValue(field.name, e.target.value);
        handleSubmit();
      }}
      value={field.value ? field.value : undefined}
      className={styles.container}
    >
      {searchFilterOptions.radius.options.map(option => (
        <div key={option}>
          <Radio className={styles.radio} value={option}>
            within {option} miles
          </Radio>
          {option === field.value && <Icon type="close" onClick={clear} />}
        </div>
      ))}
    </Radio.Group>
  );
};
