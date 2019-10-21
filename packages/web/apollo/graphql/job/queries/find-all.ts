import gql from 'graphql-tag';

export const findAllJobsQuery = gql`
  fragment JobParts on JobDto {
    id
    name
    slug
    type
    created_at
  }

  query FindAllJobs($companySlug: String!) {
    findAllJobs(companySlug: $companySlug) {
      ...JobParts
    }
  }
`;
