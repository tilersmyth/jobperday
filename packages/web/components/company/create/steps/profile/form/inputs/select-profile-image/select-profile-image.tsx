import React, { useState } from 'react';
import { Form } from 'antd';
import { FieldProps } from 'formik';

import { PROFILE_DEFAULT_IMAGES } from '../../initial-values';
import { ImageUploadModal } from '../../../../../../../shared';
import styles from './style.less';

export const SelectProfileImage: React.FunctionComponent<FieldProps> = ({
  field,
  form,
}) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <React.Fragment>
      <Form.Item className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.mask} onClick={() => setImageModal(true)} />
          <img
            src={
              field.value ? field.value : PROFILE_DEFAULT_IMAGES.profile_image
            }
          />
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