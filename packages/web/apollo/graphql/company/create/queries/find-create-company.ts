import gql from 'graphql-tag';

export const generateCompanySlugQuery = gql`
  query GenerateCompanySlug($name: String!) {
    generateCompanySlug(name: $name)
  }
`;

export const companySlugAvailableQuery = gql`
  query CompanySlugAvailable($name: String!) {
    companySlugAvailable(name: $name)
  }
`;

export const findCreateCompanyQuery = gql`
  query FindCreateCompany($companySlug: String!) {
    findCreateCompany(companySlug: $companySlug) {
      id
      slug
      name
      address {
        phone
        street
        street2
        city
        state
        postal_code
        country
        coord_lat
        coord_lng
      }
    }
  }
`;
