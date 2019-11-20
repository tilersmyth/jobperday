import gql from 'graphql-tag';

export const loginMutation = gql`
  fragment UserParts on UserDto {
    id
    first_name
    last_name
    email
    realm
    is_verified
    setup
  }

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...UserParts
    }
  }
`;

export const registerMutation = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...UserParts
    }
  }
`;

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
  }
`;
