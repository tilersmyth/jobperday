import gql from 'graphql-tag';

export const createCompanyProfileQuery = gql`
  query FindCreateCompanyProfile($companySlug: String!) {
    findCreateCompanyProfile(companySlug: $companySlug) {
      id
      profile_image
      business_type
      about
    }
  }
`;
