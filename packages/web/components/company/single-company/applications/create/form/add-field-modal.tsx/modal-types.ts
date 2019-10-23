import { ApplicationFieldInput } from '../../../../../../../apollo/generated-components';

export interface ModalState {
  visible: boolean;
  initialValues: ApplicationFieldInput;
  editField?: number;
}
