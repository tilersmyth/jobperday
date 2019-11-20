import gql from 'graphql-tag';

export const getViewportQuery = gql`
  query ViewportTypeQuery {
    viewportType @client
  }
`;
