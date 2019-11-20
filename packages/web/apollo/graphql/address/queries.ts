import gql from 'graphql-tag';

export const addressFragment = gql`
  fragment AddressParts on AddressDto {
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
`;
