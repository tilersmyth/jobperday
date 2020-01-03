import { CompanyInput } from '../../../../../../apollo';

export interface SetupFormValues extends CompanyInput {
  id?: string;
}

export const SETUP_INITIAL_VALUES: SetupFormValues = {
  name: '',
  slug: '',
};
