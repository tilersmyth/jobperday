import gql from 'graphql-tag';

export const testTypeDef = gql`
  extend type Query {
    test: Boolean!
  }
`;
