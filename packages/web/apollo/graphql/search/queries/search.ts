import gql from 'graphql-tag';

export const searchQuery = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        job {
          name
        }
      }
    }
  }
`;
