import { gql } from 'apollo-boost';

export const meQuery = gql`
  query Me {
    me {
      id
      first_name
      last_name
      email
    }
  }
`;

export const meQueryClient = gql`
  query MeClient {
    me @client {
      id
      first_name
      last_name
      email
    }
  }
`;
