import React from 'react';
import { Radio, Icon } from 'antd';
import { FieldProps } from 'formik';

import { SearchInput } from '../../../../../../../apollo';
import styles from './style.less';

const options = [15, 20, 25, 30];

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
      {options.map(option => (
        <div key={option}>
          <Radio className={styles.radio} value={option}>
            ${option}+
          </Radio>
          {option === field.value && <Icon type="close" onClick={clear} />}
        </div>
      ))}
    </Radio.Group>
  );
};
