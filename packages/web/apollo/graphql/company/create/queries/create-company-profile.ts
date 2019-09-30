import gql from 'graphql-tag';

export const createCompanyProfileQuery = gql`
  query FindCreateCompanyProfile($input: CompanySlugInput!) {
    findCreateCompanyProfile(input: $input) {
      id
      profile_image
      business_type
      about
    }
  }
`;
