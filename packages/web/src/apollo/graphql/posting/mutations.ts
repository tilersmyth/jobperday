import gql from 'graphql-tag';

export const createPostingMutation = gql`
  fragment PostingParts on JobPostingDto {
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
  }

  mutation CreatePosting($companySlug: String!, $input: AddJobPostingInput!) {
    createPosting(companySlug: $companySlug, input: $input) {
      ...PostingParts
    }
  }
`;

export const createPostingClientMutation = gql`
  mutation CreatePostingClient($postingId: ID!, $companySlug: String!) {
    createPostingClient(postingId: $postingId, companySlug: $companySlug)
      @client
  }
`;
