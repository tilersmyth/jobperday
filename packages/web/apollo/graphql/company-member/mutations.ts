import gql from 'graphql-tag';

export const createCompanyMembersMutation = gql`
  mutation CreateCompanyMembers(
    $companySlug: String!
    $input: [CompanyMemberInput!]!
  ) {
    createCompanyMembers(companySlug: $companySlug, input: $input) {
      ...CompanyMemberParts
    }
  }
`;
