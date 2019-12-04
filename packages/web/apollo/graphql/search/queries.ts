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
          postings {
            pay_rate
            start_date
            apply_deadline
            address {
              city
              state
            }
          }
          company {
            name
            profile {
              profile_image
            }
          }
        }
      }
    }
  }
`;

export const searchFindJobQuery = gql`
  query SearchFindJob($id: ID!) {
    searchFindJob(id: $id) {
      id
      title
      default_image
      description
      type
      tags
      postings {
        pay_rate
        start_date
        apply_deadline
        remaining_openings
        applicationId
        address {
          street
          street2
          city
          state
          postal_code
        }
      }
      company {
        name
        profile {
          profile_image
        }
      }
    }
  }
`;
