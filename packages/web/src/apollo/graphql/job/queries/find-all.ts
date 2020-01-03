import gql from 'graphql-tag';

export const findAllJobsQuery = gql`
  fragment JobParts on JobDto {
    id
    title
    description
    summary
    type
    tags
    default_image
    defaultApplicationId
    created_at
  }

  query FindAllJobs($companySlug: String!) {
    findAllJobs(companySlug: $companySlug) {
      ...JobParts
    }
  }
`;
