import gql from 'graphql-tag';

export const createApplicationMutation = gql`
  mutation CreateApplication($companySlug: String!, $input: ApplicationInput!) {
    createApplication(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
