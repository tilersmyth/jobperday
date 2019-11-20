import React from 'react';
import { Formik } from 'formik';

import { CreateApplicationComponent } from '../../../../apollo/generated-components';
import { createApplicationSchema } from './validation/application-schema';
import { initialApplicationValues } from './initial-values/application-values';
import { EditApplicationForm } from '../form/edit-form';

interface Props {
  companySlug: string;
}

export const CreateApplicationView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  return (
    <CreateApplicationComponent>
      {create => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async input => {
            try {
              console.log('submitted', input);

              const application = await create({
                variables: { companySlug, input },
              });

              console.log(application);
            } catch (err) {
              console.log(err);
            }
          }}
          initialValues={initialApplicationValues}
          validationSchema={createApplicationSchema}
        >
          {formikProps => <EditApplicationForm {...formikProps} />}
        </Formik>
      )}
    </CreateApplicationComponent>
  );
};
