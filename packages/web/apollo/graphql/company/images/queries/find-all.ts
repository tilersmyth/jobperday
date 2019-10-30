import gql from 'graphql-tag';

export const findCompanyImagesQuery = gql`
  query FindAllCompanyImages($companySlug: String!) {
    findAllCompanyImages(companySlug: $companySlug) {
      id
      path
    }
  }
`;
