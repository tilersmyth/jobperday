import gql from 'graphql-tag';

export const createCompanyAddMembersMutation = gql`
  mutation CreateCompanyAddMembers($input: CreateCompanyMembersInput!) {
    createCompanyAddMembers(input: $input)
  }
`;
