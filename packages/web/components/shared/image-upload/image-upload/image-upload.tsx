import React, { useState } from 'react';
import { Upload, Icon } from 'antd';
import { useMutation } from 'react-apollo';

import {
  UploadImageDocument,
  UploadImageMutation,
} from '../../../../apollo/generated-components';
import './style.less';

const { Dragger } = Upload;

interface Props {
  companySlug: string;
  multiple: boolean;
  selected: (images: Array<UploadImageMutation['uploadImage']>) => void;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  companySlug,
  multiple,
  selected,
}) => {
  const [fileList, setFileList] = useState<
    Array<UploadImageMutation['uploadImage']>
  >([]);
  const [uploadImages] = useMutation<UploadImageMutation>(UploadImageDocument);

  const onChange = ({ file }: any) => {
    if (file.status === 'done' && !multiple) {
      return selected(fileList);
    }
  };

  const request = ({ onSuccess, onError, file }: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const upload = await uploadImages({
          variables: {
            companySlug,
            input: { image: file },
          },
        });

        if (!upload || !upload.data) {
          throw Error('Upload server error');
        }

        setFileList([...fileList, upload.data.uploadImage]);
        resolve(onSuccess('done'));
      } catch (error) {
        reject(onError());
      }
    });
  };

  return (
    <Dragger
      className="dragger-container"
      multiple={multiple}
      onChange={onChange}
      customRequest={request}
    >
      <p className="ant-upload-drag-icon">
        <Icon type="picture" />
      </p>
      <p className="ant-upload-text">
        Click or drag image to this area to upload
      </p>
      <p className="ant-upload-hint">
        File extensions allowed: jpeg, png, iso. Max size: 32MB.
      </p>
    </Dragger>
  );
};
