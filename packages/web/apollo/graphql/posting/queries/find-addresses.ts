import gql from 'graphql-tag';

export const findJobAddressesQuery = gql`
  query FindJobAddresses($companySlug: String!) {
    findJobAddresses(companySlug: $companySlug) {
      id
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
`;
