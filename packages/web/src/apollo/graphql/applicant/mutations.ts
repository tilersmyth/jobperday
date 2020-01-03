import gql from 'graphql-tag';

export const createApplicantMutation = gql`
  mutation CreateApplicant($input: CreateApplicantInput!) {
    createApplicant(input: $input)
  }
`;
