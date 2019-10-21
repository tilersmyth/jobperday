import React from 'react';
import { Formik } from 'formik';

import {
  CreateCompanyAddMembersComponent,
  FindCompanyDocument,
} from '../../../../../../apollo/generated-components';
import { CreateCompanyStepsFooter } from '../../steps-footer-view';
import { Step3MembersView } from './step3-members/step3-members-view';

interface Props {
  companySlug: string;
  members: any;
  nextStep: (slug: string) => void;
  previousStep: () => void;
}

export const Step3Form: React.FunctionComponent<Props> = ({
  members,
  companySlug,
  nextStep,
  previousStep,
}) => {
  return (
    <CreateCompanyAddMembersComponent>
      {submit => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async () => {
            try {
              const result = await submit({
                variables: {
                  companySlug,
                  input: [],
                },
                update(cache) {
                  const { findCompany } = cache.readQuery<any>({
                    query: FindCompanyDocument,
                    variables: {
                      companySlug,
                    },
                  });

                  cache.writeQuery({
                    query: FindCompanyDocument,
                    data: {
                      findCompany: { ...findCompany, setup_stage: 3 },
                    },
                  });
                },
              });

              if (
                !result ||
                !result.data ||
                !result.data.createCompanyAddMembers
              ) {
                throw Error('Error adding company members');
              }

              nextStep(companySlug);
            } catch (error) {
              throw error;
            }
          }}
          initialValues={members}
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Step3MembersView members={values} />
              <CreateCompanyStepsFooter step={2} previousStep={previousStep} />
            </form>
          )}
        </Formik>
      )}
    </CreateCompanyAddMembersComponent>
  );
};
