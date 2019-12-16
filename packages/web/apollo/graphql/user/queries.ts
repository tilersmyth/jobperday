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
      location {
        locality
        coords {
          lng
          lat
        }
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

export const getSearchLocationQuery = gql`
  query GetSearchLocation($locationParam: String!) {
    getSearchLocation(locationParam: $locationParam) @client {
      type
      location {
        locality
        coords {
          lat
          lng
        }
      }
    }
  }
`;

export const getNonSearchLocationQuery = gql`
  query GetNonSearchLocation {
    getNonSearchLocation @client {
      locality
      coords {
        lat
        lng
      }
    }
  }
`;
