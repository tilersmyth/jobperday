import gql from 'graphql-tag';

export const searchQuery = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        job {
          id
          title
          type
          postings {
            id
            start_date
            apply_deadline
            pay_rate
            total_openings
          }
        }
      }
    }
  }
`;
