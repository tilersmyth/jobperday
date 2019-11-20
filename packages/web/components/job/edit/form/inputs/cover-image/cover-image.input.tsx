import React, { useState } from 'react';
import { FieldProps } from 'formik';
import { Button } from 'antd';

import { ImageUploadModal } from '../../../../../shared';
import { JobInputCard } from '../../../layout';
import './style.less';

export const JobCoverImageInput: React.FunctionComponent<FieldProps> = ({
  field,
  form,
}) => {
  const [imageModal, setImageModal] = useState(false);
  return (
    <JobInputCard
      title="Default Cover Image"
      hint="Default background image that will display on job posting. Can be changed when posting."
      extra={
        <Button size="small" onClick={() => setImageModal(true)}>
          change
        </Button>
      }
    >
      <div className="default-image-input-container">
        <img src={field.value} />
      </div>
      <ImageUploadModal
        setVisible={setImageModal}
        visible={imageModal}
        multiple={false}
        onSelect={files => {
          form.setFieldValue(field.name, files[0]);
        }}
      />
    </JobInputCard>
  );
};
