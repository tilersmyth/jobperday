import React from 'react';
import { Select, Form, Divider, Icon } from 'antd';
import { FieldProps, getIn } from 'formik';
import { useQuery, QueryResult } from 'react-apollo';

import {
  FindCompanyAddressesDocument,
  FindCompanyAddressesQuery,
} from '../../../../../../apollo/generated-components';
import styles from './style.less';

const { Option } = Select;

interface Props extends FieldProps {
  companySlug: string;
  switchAddress: (value: boolean) => void;
}

const addressOption = (
  client: QueryResult<FindCompanyAddressesQuery, Record<string, any>>,
) => {
  const { loading, error, data } = client;

  if (loading) {
    return (
      <Option key="loading" value="loading">
        loading
      </Option>
    );
  }

  if (error || !data) {
    return (
      <Option key="error" value="error">
        error
      </Option>
    );
  }

  return data.findCompanyAddresses.map(address => (
    <Option key={address.id} value={address.id}>
      {`${address.street}, ${address.street2 ? `${address.street2}, ` : ``} ${
        address.city
      }, ${address.state} ${address.postal_code}`}
    </Option>
  ));
};

export const SelectAddressInput: React.FunctionComponent<Props> = ({
  companySlug,
  switchAddress,
  field: { name },
  form: { errors, touched, setFieldValue },
  ...inputProps
}) => {
  const client = useQuery<FindCompanyAddressesQuery>(
    FindCompanyAddressesDocument,
    {
      variables: { companySlug },
    },
  );

  const errorMsg = getIn(errors, name);
  const inputError = errorMsg && getIn(touched, name);

  return (
    <Form.Item
      label="Location"
      validateStatus={inputError ? 'error' : undefined}
      help={errorMsg}
    >
      <Select
        {...inputProps}
        showSearch={true}
        optionFilterProp="children"
        onChange={(value: string) => {
          setFieldValue(name, value);
          setFieldValue('address.addressId', value);
        }}
        filterOption={(input, { props }) => {
          const { children } = props;

          if (!children) {
            return false;
          }

          return (children as string)
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
        dropdownRender={menu => (
          <div className={styles.menu}>
            {menu}
            <Divider className={styles.divider} />
            <div
              className={styles.extra}
              onMouseDown={e => e.preventDefault()}
              onClick={() => switchAddress(true)}
            >
              <Icon type="plus" /> New address
            </div>
          </div>
        )}
      >
        {addressOption(client)}
      </Select>
    </Form.Item>
  );
};
