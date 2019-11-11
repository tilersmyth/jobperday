import React, { useState } from 'react';
import { Form } from 'antd';
import { FieldProps } from 'formik';

import { PROFILE_DEFAULT_IMAGES } from '../../initial-values';
import { ImageUploadModal } from '../../../../../../../shared';
import './style.less';

export const SelectCoverImage: React.FunctionComponent<FieldProps> = ({
  field,
  form,
}) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <React.Fragment>
      <Form.Item className="images-container">
        <div className="cover-image-container">
          <div
            className="cover-image-mask"
            onClick={() => setImageModal(true)}
          />
          <img
            src={field.value ? field.value : PROFILE_DEFAULT_IMAGES.cover_image}
          />
        </div>
      </Form.Item>

      <ImageUploadModal
        multiple={false}
        visible={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        onSelect={files => {
          form.setFieldValue(field.name, files[0].path);
          setImageModal(false);
        }}
      />
    </React.Fragment>
  );
};
