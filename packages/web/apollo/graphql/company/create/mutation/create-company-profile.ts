import gql from 'graphql-tag';

export const createCompanyProfileMutation = gql`
  mutation CreateCompanyProfile(
    $companySlug: String!
    $input: CompanyProfileInput!
  ) {
    createCompanyProfile(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;

export const updateCreateCompanyProfileMutation = gql`
  mutation UpdateCreateCompanyProfile(
    $companySlug: String!
    $input: UpdateProfileInput!
  ) {
    updateCreateCompanyProfile(companySlug: $companySlug, input: $input) {
      id
      about
      business_type
      profile_image
    }
  }
`;
