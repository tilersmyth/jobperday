import { UpdateJobInput } from '../../../../apollo/generated-components';

interface UpdateJobInputExt extends UpdateJobInput {
  [index: string]: any;
}

export const INITIAL_JOB_VALUES: UpdateJobInputExt = {
  id: '',
  title: '',
  summary: '',
  description: '',
  type: '',
  tags: [],
  default_image: '',
  defaultApplicationId: undefined,
};
