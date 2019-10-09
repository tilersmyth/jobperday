import gql from 'graphql-tag';

export const findAllJobsQuery = gql`
  query FindAllJobs($companySlug: String!) {
    findAllJobs(companySlug: $companySlug) {
      id
      name
      slug
      type
      created_at
    }
  }
`;
