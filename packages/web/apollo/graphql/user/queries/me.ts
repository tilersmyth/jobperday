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
    }
  }
`;
