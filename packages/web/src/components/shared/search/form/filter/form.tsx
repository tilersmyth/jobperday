import React from 'react';
import { Form } from 'antd';
import { Formik, Field } from 'formik';
import { ApolloConsumer } from 'react-apollo';

import { FilterRadiusInput, FilterPayrateInput } from './inputs';
import { SearchInput } from '../../../../../apollo/generated-components';
import { FilterMenuCollapse } from './menu-collapse';

interface Props {
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchFilterForm: React.FunctionComponent<Props> = ({
  searchArgs,
  setSearchArgs,
}) => {
  return (
    <ApolloConsumer>
      {() => (
        <Formik
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async variables => {
            searchArgs.filters = variables;
            await setSearchArgs(searchArgs);
          }}
          initialValues={searchArgs.filters}
        >
          {() => (
            <Form layout="vertical">
              <FilterMenuCollapse title="Distance">
                <Field name="radius" component={FilterRadiusInput} />
              </FilterMenuCollapse>
              <FilterMenuCollapse title="Hourly Rate">
                <Field name="pay_rate" component={FilterPayrateInput} />
              </FilterMenuCollapse>
            </Form>
          )}
        </Formik>
      )}
    </ApolloConsumer>
  );
};
