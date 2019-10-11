import { AddJobPostingInput } from '../../../../../../apollo/generated-components';

export const initialPostingValues: AddJobPostingInput = {
  jobId: '',
  address: {},
  posting: {
    start_date: '',
    end_date: '',
    pay_rate: '',
    total_openings: 0,
    apply_deadline: '',
  },
};
