import React, { useState } from 'react';
import { Form } from 'antd';
import { FieldProps } from 'formik';

import { ImageUploadModal } from '../../../../../../../shared';
import styles from './style.less';

export const SelectCoverImage: React.FunctionComponent<FieldProps> = ({
  field,
  form,
}) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <React.Fragment>
      <Form.Item>
        <div className={styles.container}>
          <div className={styles.mask} onClick={() => setImageModal(true)} />
          <img src={field.value} />
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
