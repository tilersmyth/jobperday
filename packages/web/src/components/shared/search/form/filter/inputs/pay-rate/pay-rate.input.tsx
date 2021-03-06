import React from 'react';
import { Radio } from 'antd';
import { FieldProps } from 'formik';
import { searchFilterOptions } from '@jobperday/common';

import { SearchInput } from '../../../../../../../apollo';
import { Icon } from '../../../../../icon';
import styles from './style.less';

export const FilterPayrateInput: React.FunctionComponent<FieldProps<
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
      {searchFilterOptions.pay_rate.options.map(option => (
        <div key={option}>
          <Radio className={styles.radio} value={option}>
            ${option}+
          </Radio>
          {option === field.value && <Icon type="close-line" onClick={clear} />}
        </div>
      ))}
    </Radio.Group>
  );
};
