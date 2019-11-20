import gql from 'graphql-tag';

export const createJobMutation = gql`
  mutation CreateJob($companySlug: String!, $input: JobInput!) {
    createJob(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;

export const updateJobMutation = gql`
  mutation UpdateJob($companySlug: String!, $input: UpdateJobInput!) {
    updateJob(companySlug: $companySlug, input: $input) {
      ...JobParts
    }
  }
`;
