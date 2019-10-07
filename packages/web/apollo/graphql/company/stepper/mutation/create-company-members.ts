import gql from 'graphql-tag';

export const createCompanyAddMembersMutation = gql`
  mutation CreateCompanyAddMembers(
    $companySlug: String!
    $input: [CompanyMemberInput!]
  ) {
    createCompanyAddMembers(companySlug: $companySlug, input: $input)
  }
`;
