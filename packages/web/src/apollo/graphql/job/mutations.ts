import gql from 'graphql-tag';

export const createJobMutation = gql`
  mutation CreateJob($companySlug: String!, $input: JobInput!) {
    createJob(companySlug: $companySlug, input: $input) {
      ...JobParts
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

export const updateJobListMutation = gql`
  mutation UpdateJobList($companySlug: String!, $input: JobInput!) {
    updateJobList(companySlug: $companySlug, input: $input) @client
  }
`;
