import gql from 'graphql-tag';

export const UserLocationQuery = gql`
  query UserLocation {
    userLocation {
      locality
      coords {
        lat
        lng
      }
    }
  }
`;
