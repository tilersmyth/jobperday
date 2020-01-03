import gql from 'graphql-tag';

export const testQuery = gql`
  query Test {
    test @client
`;
