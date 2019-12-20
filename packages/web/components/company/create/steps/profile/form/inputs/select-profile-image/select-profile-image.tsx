import React, { useState } from 'react';
import { Form } from 'antd';
import { FieldProps } from 'formik';

import { CurrentCompanyQuery } from '../../../../../../../../apollo';
import { ImageUploadModal, ProfileAvatar } from '../../../../../../../shared';
import styles from './style.less';

interface Props extends FieldProps {
  company: CurrentCompanyQuery['currentCompany'];
}

export const SelectProfileImage: React.FunctionComponent<Props> = ({
  field,
  form,
  company,
}) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <React.Fragment>
      <Form.Item className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.mask} onClick={() => setImageModal(true)} />
          {field.value && <img src={field.value} />}
          {!field.value && (
            <ProfileAvatar
              color={form.values.color}
              companyName={company.name}
              size={200}
              shape="square"
            />
          )}
        </div>
      </Form.Item>

      <ImageUploadModal
        setVisible={setImageModal}
        visible={imageModal}
        multiple={false}
        onSelect={files => {
          form.setFieldValue(field.name, files[0]);
        }}
      />
    </React.Fragment>
  );
};
