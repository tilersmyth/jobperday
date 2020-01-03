import React from 'react';
import { Formik } from 'formik';
import { useMutation } from 'react-apollo';
import { ModalProps } from 'antd/lib/modal';

import {
  FindApplicationQuery,
  CreateApplicantDocument,
  CreateApplicantMutation,
  SearchFindPostingQuery,
} from '../../../../../../apollo';
import { dynamicSchema } from './validation-schema';
import { ApplicationForm } from './form';

interface Props {
  modalState: [ModalProps, React.Dispatch<React.SetStateAction<ModalProps>>];
  posting: SearchFindPostingQuery['searchFindPosting'];
  fields: FindApplicationQuery['findApplication']['fields'];
}

export const ApplicationFormView: React.FunctionComponent<Props> = ({
  modalState,
  posting,
  fields,
}) => {
  const [createApplicant] = useMutation<CreateApplicantMutation>(
    CreateApplicantDocument,
  );
  const initialValues = fields.reduce((acc: any, field) => {
    return { [field.id]: '', ...acc };
  }, {});

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize={true}
      onSubmit={async inputs => {
        const answers = Object.keys(inputs).reduce((acc: any, prop) => {
          return [{ fieldId: prop, response: inputs[prop] }, ...acc];
        }, []);

        await createApplicant({
          variables: {
            input: {
              companyId: posting.company.id,
              jobId: posting.job.id,
              postingId: posting.id,
              answers,
            },
          },
        });

        modalState[1]({ visible: false });
      }}
      initialValues={initialValues}
      validationSchema={dynamicSchema(fields)}
    >
      {formikProps => <ApplicationForm {...formikProps} fields={fields} />}
    </Formik>
  );
};
