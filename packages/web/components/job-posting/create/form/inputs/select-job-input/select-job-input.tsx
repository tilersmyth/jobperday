import React from 'react';
import Router from 'next/router';
import { Select, Form, Divider, Icon } from 'antd';
import { FieldProps, getIn } from 'formik';

import { FindAllJobsQuery } from '../../../../../../apollo/generated-components';
import styles from './style.less';

const { Option } = Select;

interface Props extends FieldProps {
  companySlug: string;
  jobs: FindAllJobsQuery['findAllJobs'];
}

export const SelectJobInput: React.FunctionComponent<Props> = ({
  companySlug,
  jobs,
  field: { name },
  form: { errors, touched, setFieldValue },
  ...inputProps
}) => {
  const errorMsg = getIn(errors, name);
  const error = errorMsg && getIn(touched, name);

  const createNewJob = () => {
    Router.push(
      '/employer/[company-slug]/jobs/create',
      `/employer/${companySlug}/jobs/create`,
    );
  };

  return (
    <Form.Item
      label="Select a job"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <Select
        {...inputProps}
        showSearch={true}
        optionFilterProp="children"
        onChange={(value: string) => setFieldValue(name, value)}
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
          <div className={styles.dropdown}>
            {menu}
            <Divider className={styles.divider} />
            <div
              className={styles.option}
              onMouseDown={e => e.preventDefault()}
              onClick={createNewJob}
            >
              <Icon type="plus" /> Create new job
            </div>
          </div>
        )}
      >
        {jobs.map(job => (
          <Option key={job.id} value={job.id}>
            {job.title}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
