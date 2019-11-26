import gql from 'graphql-tag';

export const viewportQuery = gql`
  query ViewportQuery {
    viewport @client
  }
`;
