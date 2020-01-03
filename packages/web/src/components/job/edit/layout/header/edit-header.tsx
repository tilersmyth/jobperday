import React from 'react';
import { Button } from 'antd';

import { UpdateJobInput } from '../../../../../apollo/generated-components';
import { CompanyPageHeader, Icon } from '../../../../shared';
import styles from './style.less';

interface Props {
  formValues: UpdateJobInput;
  status: string;
}

export const EditJobHeader: React.FunctionComponent<Props> = ({
  formValues,
  status,
}) => (
  <CompanyPageHeader
    className={styles.container}
    title={formValues.id ? `Edit: ${formValues.title}` : 'Create New Job'}
    extra={[
      formValues.id && formValues.defaultApplicationId && (
        <Button key="post" type="primary">
          Post Job
        </Button>
      ),
      <Button
        key="create"
        htmlType="submit"
        loading={status === 'loading'}
        className="secondary-btn"
      >
        {formValues.id ? 'Update Job' : 'Save Job'}
      </Button>,
      formValues.id && (
        <Button key="more" type="link">
          <Icon type="more-2-line" />
        </Button>
      ),
    ]}
  />
);
