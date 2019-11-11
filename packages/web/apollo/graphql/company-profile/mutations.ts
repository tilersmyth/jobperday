import gql from 'graphql-tag';

export const createCompanyProfileMutation = gql`
  mutation CreateCompanyProfile(
    $companySlug: String!
    $input: CompanyProfileInput!
  ) {
    createCompanyProfile(companySlug: $companySlug, input: $input) {
      ...CompanyProfileParts
    }
  }
`;

export const updateCompanyProfileMutation = gql`
  mutation UpdateCompanyProfile(
    $companySlug: String!
    $input: UpdateCompanyProfileInput!
  ) {
    updateCompanyProfile(companySlug: $companySlug, input: $input) {
      ...CompanyProfileParts
    }
  }
`;

export const updateCompanyProfileClientMutation = gql`
  mutation UpdateCompanyProfileClient($input: UpdateCompanyProfileInput!) {
    updateCompanyProfileClient(input: $input) @client
  }
`;
