import { InputType, Field } from 'type-graphql';
import { FileUpload } from 'graphql-upload';

import { UploadScalar } from '../../../_helpers/scalars/upload.scalar';

@InputType()
export class UploadImageInput {
  @Field(() => UploadScalar)
  readonly image: Promise<FileUpload>;
}
