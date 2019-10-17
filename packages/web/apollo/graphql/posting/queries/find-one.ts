import gql from 'graphql-tag';

export const findPostingQuery = gql`
  query FindPosting($companySlug: String!, $postingId: String!) {
    findPosting(companySlug: $companySlug, postingId: $postingId) {
      ...PostingParts
    }
  }
`;
