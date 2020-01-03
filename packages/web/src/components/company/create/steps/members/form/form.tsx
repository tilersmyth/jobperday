import React from 'react';
import { Form } from 'antd';
import { FormikProps } from 'formik';

import { CreateCompanyStepsActions } from '../../../shared';
import { CompanyMembersTable } from './members-table';
import { FindCompanyMembersQuery } from '../../../../../../apollo';

interface Props
  extends FormikProps<FindCompanyMembersQuery['findCompanyMembers']> {
  step: number;
}

export const CompanyMembersForm: React.FunctionComponent<Props> = ({
  step,
  handleSubmit,
  values,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <CompanyMembersTable formData={values} />
      <CreateCompanyStepsActions step={step} />
    </Form>
  );
};
