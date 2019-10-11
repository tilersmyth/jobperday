import gql from 'graphql-tag';

export const findCurrentPostingsQuery = gql`
  query FindCurrentPostings($companySlug: String!) {
    findCurrentPostings(companySlug: $companySlug) {
      id
      start_date
      end_date
      pay_rate
      total_openings
      remaining_openings
      apply_deadline
    }
  }
`;
