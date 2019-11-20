import gql from 'graphql-tag';

export const findOneJobQuery = gql`
  query FindJob($companySlug: String!, $id: ID!) {
    findJob(companySlug: $companySlug, id: $id) {
      ...JobParts
    }
  }
`;
