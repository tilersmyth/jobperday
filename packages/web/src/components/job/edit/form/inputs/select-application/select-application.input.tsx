import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { Select, Form } from 'antd';
import { FieldProps } from 'formik';

import {
  FindAllApplicationsQuery,
  FindAllApplicationsDocument,
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../../../apollo';
import styles from './style.less';

const { Option } = Select;

export const SelectApplicationInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
  ...inputProps
}) => {
  const [queryState, setQueryState] = useState<{
    state: string;
    data: FindAllApplicationsQuery['findAllApplications'];
  }>({ state: 'loading...', data: [] });

  const {
    loading: companyLoading,
    data: companyData,
    error: companyError,
  } = useQuery<CurrentCompanyQuery>(CurrentCompanyDocument);

  if (companyError || !companyData || companyLoading) {
    return null;
  }

  const { currentCompany } = companyData;

  const client = useQuery<FindAllApplicationsQuery>(
    FindAllApplicationsDocument,
    {
      variables: { companySlug: currentCompany.slug },
    },
  );

  useEffect(() => {
    const { loading, error, data } = client;

    if (loading) {
      return;
    }

    if (error || !data) {
      setQueryState({ state: 'Something went wrong', data: [] });
      return;
    }

    setQueryState({ state: 'Done', data: data.findAllApplications });
  }, [client]);

  const options = queryState.data.map(app => (
    <Option key={app.id}>{app.title}</Option>
  ));

  const defaultValue = queryState.data.find(d => d.id === field.value);

  return (
    <Form.Item>
      <Select
        {...inputProps}
        loading={queryState.state === 'loading'}
        value={defaultValue ? defaultValue.title : undefined}
        size="large"
        placeholder="Select Application"
        onChange={(value: any) => setFieldValue(field.name, value)}
        notFoundContent={<div>No applications available</div>}
        dropdownRender={menu => {
          if (queryState.state !== 'Done') {
            return <div className={styles.loading}>{queryState.state}</div>;
          }

          return <div>{menu}</div>;
        }}
      >
        {options}
      </Select>
    </Form.Item>
  );
};
