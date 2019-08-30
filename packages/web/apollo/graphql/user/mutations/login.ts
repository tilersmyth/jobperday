import { gql } from 'apollo-boost';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password })
  }
`;
