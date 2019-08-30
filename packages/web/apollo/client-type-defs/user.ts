import gql from 'graphql-tag';

export const userTypeDef = gql`
  extend type Query {
    me: UserDto!
  }
`;
