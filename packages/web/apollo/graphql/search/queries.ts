import gql from 'graphql-tag';

export const search2Query = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        posting {
          id
          pay_rate
          start_date
          apply_deadline
          address {
            city
            state
          }
          job {
            id
            title
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

export const searchFindPostingQuery = gql`
  query SearchFindPosting($id: ID!) {
    searchFindPosting(id: $id) {
      id
      pay_rate
      start_date
      apply_deadline
      remaining_openings
      applicationId
      address {
        ...AddressParts
      }
      job {
        id
        title
        type
        tags
        default_image
        description
      }
      company {
        id
        name
        profile {
          profile_image
        }
      }
    }
  }
`;
