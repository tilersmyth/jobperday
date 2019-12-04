import gql from 'graphql-tag';

export const findPostingQuery = gql`
  query FindPosting($companySlug: String!, $postingId: ID!) {
    findPosting(companySlug: $companySlug, postingId: $postingId) {
      ...PostingParts
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
