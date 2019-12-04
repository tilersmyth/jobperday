import React from 'react';
import { Formik } from 'formik';

import {
  FindApplicationQuery,
  ApplicationFieldsEnum,
} from '../../../../../../apollo';
import { dynamicSchema } from './validation-schema';
import { ApplicationForm } from './form';

interface Props {
  fields: FindApplicationQuery['findApplication']['fields'];
}

export const ApplicationFormView: React.FunctionComponent<Props> = ({
  fields,
}) => {
  const initialValues = fields.reduce((acc: any, field) => {
    if (field.type === ApplicationFieldsEnum.Checkbox) {
      return { [field.id]: [], ...acc };
    }
    return { [field.id]: '', ...acc };
  }, {});

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize={true}
      onSubmit={async inputs => {
        console.log(inputs);
      }}
      initialValues={initialValues}
      validationSchema={dynamicSchema(fields)}
    >
      {formikProps => <ApplicationForm {...formikProps} fields={fields} />}
    </Formik>
  );
};
