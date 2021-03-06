import gql from 'graphql-tag';

export const findCompanyProfileQuery = gql`
  fragment CompanyProfileParts on CompanyProfileDto {
    id
    about
    cover_image
    profile_image
    color
  }

  query FindCompanyProfile($companySlug: String!) {
    findCompanyProfile(companySlug: $companySlug) {
      ...CompanyProfileParts
    }
  }
`;
