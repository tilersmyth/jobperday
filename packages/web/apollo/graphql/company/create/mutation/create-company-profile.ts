import gql from 'graphql-tag';

export const createCompanyProfileMutation = gql`
  mutation CreateCompanyProfile($input: CreateCompanyProfileInput!) {
    createCompanyProfile(input: $input) {
      id
    }
  }
`;

export const updateCreateCompanyProfileMutation = gql`
  mutation UpdateCreateCompanyProfile($input: UpdateCompanyProfileInput!) {
    updateCreateCompanyProfile(input: $input) {
      id
      about
      business_type
      profile_image
    }
  }
`;
