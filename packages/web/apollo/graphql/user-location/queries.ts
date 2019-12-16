import gql from 'graphql-tag';

export const UserLocationIpClientQuery = gql`
  query UserIpLocation {
    userIpLocation {
      locality
      coords {
        lat
        lng
      }
    }
  }
`;

export const UserLocationGoogleQuery = gql`
  query UserGoogleLocation($address: String!) {
    userGoogleLocation(address: $address) {
      locality
      coords {
        lat
        lng
      }
    }
  }
`;
