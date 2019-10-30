import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { Select, Form } from 'antd';
import { FieldProps, getIn } from 'formik';

import {
  FindAllApplicationsDocument,
  FindAllApplicationsQuery,
} from '../../../../../../../../apollo/generated-components';
import './style.less';

const { Option } = Select;

interface Props extends FieldProps {
  companySlug: string;
}

export const SelectApplicationInput: React.FunctionComponent<Props> = ({
  companySlug,
  field: { name },
  form: { errors, touched, setFieldValue },
  ...inputProps
}) => {
  const [queryState, setQueryState] = useState<{
    state: string;
    data: FindAllApplicationsQuery['findAllApplications'];
  }>({ state: 'loading...', data: [] });

  const client = useQuery<FindAllApplicationsQuery>(
    FindAllApplicationsDocument,
    {
      variables: { companySlug },
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

  const errorMsg = getIn(errors, name);
  const inputError = errorMsg && getIn(touched, name);

  return (
    <Form.Item
      label="Select application"
      validateStatus={inputError ? 'error' : undefined}
      help={errorMsg}
    >
      <Select
        {...inputProps}
        onChange={(value: string) => setFieldValue(name, value)}
        dropdownRender={menu => {
          if (queryState.state !== 'Done') {
            return <div className="incomplete-option">{queryState.state}</div>;
          }

          return <div>{menu}</div>;
        }}
      >
        {options}
      </Select>
    </Form.Item>
  );
};
