import gql from 'graphql-tag';

export const registerMutation = gql`
  mutation Register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
      }
    ) {
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