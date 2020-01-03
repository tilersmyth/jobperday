import gql from 'graphql-tag';

export const findPostingQuery = gql`
  query FindPosting($companySlug: String!, $postingId: ID!) {
    findPosting(companySlug: $companySlug, postingId: $postingId) {
      id
      start_date
      end_date
      pay_rate
      total_openings
      remaining_openings
      apply_deadline
      job {
        title
      }
      status
      address {
        street
        street2
        city
        state
        postal_code
      }
    }
  }
`;

export const findCurrentPostingsQuery = gql`
  query FindCurrentPostings($companySlug: String!, $input: PaginationInput!) {
    findCurrentPostings(companySlug: $companySlug, input: $input) {
      count
      postings {
        ...PostingParts
      }
    }
  }
`;

export const findAllPostingsQuery = gql`
  query FindAllPostings($companySlug: String!, $input: FindAllPostingsInput!) {
    findAllPostings(companySlug: $companySlug, input: $input) {
      count
      postings {
        ...PostingParts
      }
    }
  }
`;

export const findPostingCount = gql`
  query PostingCount($companySlug: String!) {
    postingCount(companySlug: $companySlug) {
      open
      closed
    }
  }
`;
