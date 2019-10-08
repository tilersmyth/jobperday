import gql from 'graphql-tag';

export const createJobMutation = gql`
  mutation CreateJob($companySlug: String!, $input: JobInput!) {
    createJob(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
