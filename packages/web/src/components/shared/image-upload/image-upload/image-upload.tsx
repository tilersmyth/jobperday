import React, { useState } from 'react';
import { Upload } from 'antd';
import { useMutation } from 'react-apollo';

import {
  UploadImageDocument,
  UploadImageMutation,
  FindAllCompanyImagesDocument,
} from '../../../../apollo/generated-components';
import { Icon } from '../../icon';
import styles from './style.less';

const { Dragger } = Upload;

interface Props {
  companySlug: string;
  multiple: boolean;
  selected: (images: string[]) => void;
  setVisible: (value: boolean) => void;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  companySlug,
  multiple,
  selected,
  setVisible,
}) => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [uploadImages] = useMutation<UploadImageMutation>(UploadImageDocument);

  const onChange = ({ file }: any) => {
    if (file.status === 'done' && !multiple) {
      selected(fileList);
      setVisible(false);
      return;
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
          update(cache, update) {
            if (!update.data) {
              return;
            }

            try {
              const { findAllCompanyImages } = cache.readQuery<any>({
                query: FindAllCompanyImagesDocument,
                variables: { companySlug },
              });

              cache.writeQuery({
                query: FindAllCompanyImagesDocument,
                variables: { companySlug },
                data: {
                  findAllCompanyImages: [
                    ...findAllCompanyImages,
                    update.data.uploadImage,
                  ],
                },
              });
            } catch (err) {
              return;
            }
          },
        });

        if (!upload || !upload.data) {
          throw Error('Upload server error');
        }

        setFileList([...fileList, upload.data.uploadImage.path]);
        resolve(onSuccess('done'));
      } catch (error) {
        reject(onError());
      }
    });
  };

  return (
    <Dragger
      className={styles.container}
      multiple={multiple}
      onChange={onChange}
      customRequest={request}
    >
      <p className="ant-upload-drag-icon">
        <Icon type="image-line" />
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
