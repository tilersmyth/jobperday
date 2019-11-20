import gql from 'graphql-tag';

export const meQuery = gql`
  query Me {
    me {
      id
      first_name
      last_name
      email
      realm
      is_verified
      setup
      search {
        locality
        coords {
          lng
          lat
        }
      }
    }
  }
`;

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

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser @client {
      id
      first_name
      last_name
      email
      realm
      is_verified
      setup
    }
  }
`;
