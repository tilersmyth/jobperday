import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useQuery } from 'react-apollo';
import Router from 'next/router';

import { SearchSchema } from './validation-schema';
import {
  SearchInput,
  ViewportQueryQuery,
  ViewportQueryDocument,
} from '../../../../../apollo';
import { SearchHeaderForm } from '../../form';
import { SearchHeaderContainer } from './container';
import { Breakpoints, argsQueryString } from '../../../../../utils';

interface Props {
  searchArgs: SearchInput;
  openDrawer: (value: boolean) => void;
}

export const SearchHeader: React.FunctionComponent<Props> = ({
  searchArgs,
  openDrawer,
}) => {
  const [secondary, setSecondary] = useState();
  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  useEffect(() => {
    if (Breakpoints[data.viewport] > Breakpoints.XL) {
      setSecondary(false);
      openDrawer(false);
    }
  }, [data.viewport]);

  return (
    <SearchHeaderContainer>
      <Formik
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={true}
        validationSchema={SearchSchema}
        onSubmit={async input => {
          const href = argsQueryString(input);
          const as = href;
          await Router.push(href, as);
        }}
        initialValues={searchArgs}
      >
        {formikProps => (
          <SearchHeaderForm
            {...formikProps}
            secondary={secondary}
            setSecondary={setSecondary}
            openDrawer={openDrawer}
          />
        )}
      </Formik>
    </SearchHeaderContainer>
  );
};
