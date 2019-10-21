import gql from 'graphql-tag';

export const findOneJobQuery = gql`
  query FindJob($companySlug: String!, $jobSlug: String!) {
    findJob(companySlug: $companySlug, jobSlug: $jobSlug) {
      ...JobParts
    }
  }
`;
