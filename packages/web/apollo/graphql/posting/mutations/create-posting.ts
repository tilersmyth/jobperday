import gql from 'graphql-tag';

export const createPostingMutation = gql`
  mutation CreatePosting($companySlug: String!, $input: AddJobPostingInput!) {
    createPosting(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
