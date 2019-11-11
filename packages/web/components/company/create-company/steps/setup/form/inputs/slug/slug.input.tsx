import { useEffect } from 'react';
import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';

import { GenerateCompanySlugComponent } from '../../../../../../../../apollo';

interface FieldPropsExt extends FieldProps {
  label: string;
  initialValue: string;
}

export const CompanySlugInput = ({
  field,
  form: { errors, touched, setFieldValue },
  initialValue,
  ...props
}: FieldPropsExt) => {
  if (field.value) {
    const errorMsg = getIn(errors, field.name);
    const error = errorMsg && getIn(touched, field.name);
    const { label, ...rest } = props;
    return (
      <Form.Item
        validateStatus={error ? 'error' : undefined}
        help={errorMsg}
        label={label}
      >
        <Input addonBefore="jobperday.com/company/" {...field} {...rest} />
      </Form.Item>
    );
  }

  if (initialValue) {
    return (
      <GenerateCompanySlugComponent variables={{ name: initialValue }}>
        {({ data, loading, error }) => {
          useEffect(() => {
            if (data && data.generateCompanySlug) {
              setFieldValue(field.name, data.generateCompanySlug);
            }
          }, [data]);

          if (loading) {
            return <div>loading</div>;
          }

          if (error) {
            return <div>Error generating slug</div>;
          }

          return null;
        }}
      </GenerateCompanySlugComponent>
    );
  }

  return null;
};
