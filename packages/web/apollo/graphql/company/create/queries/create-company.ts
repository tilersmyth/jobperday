import gql from 'graphql-tag';

export const findCreateCompanyQuery = gql`
  query FindCreateCompany($input: CompanySlugInput!) {
    findCreateCompany(input: $input) {
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
