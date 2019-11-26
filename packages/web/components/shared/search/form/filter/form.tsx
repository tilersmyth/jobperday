import React from 'react';
import { Form, Select } from 'antd';
import { Formik } from 'formik';
import { ApolloConsumer } from 'react-apollo';

import { SearchInput } from '../../../../../apollo/generated-components';

const { Option } = Select;

interface Props {
  searchArgs: SearchInput;
  updateArgs: (args: SearchInput) => void;
}

export const SearchFilterForm: React.FunctionComponent<Props> = ({
  searchArgs,
  updateArgs,
}) => {
  return (
    <ApolloConsumer>
      {() => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async variables => {
            searchArgs.options = variables;
            await updateArgs(searchArgs);
          }}
          initialValues={{
            ...searchArgs.options,
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form layout="vertical">
              <Form.Item label="Radius">
                <Select
                  defaultValue={values.radius}
                  onChange={(value: number) => {
                    setFieldValue('radius', value);
                    handleSubmit();
                  }}
                >
                  <Option value={20}>within 20 miles</Option>
                  <Option value={50}>within 50 miles</Option>
                  <Option value={100}>within 100 miles</Option>
                  <Option value={200}>Any distance</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Hourly Rate">
                <Select
                  defaultValue={values.pay_rate}
                  onChange={(value: number) => {
                    setFieldValue('pay_rate', value);
                    handleSubmit();
                  }}
                >
                  <Option value={15}>$15+</Option>
                  <Option value={20}>$20+</Option>
                  <Option value={25}>$25+</Option>
                  <Option value={30}>$30+</Option>
                  <Option value={0}>All hourly rates</Option>
                </Select>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}
    </ApolloConsumer>
  );
};
