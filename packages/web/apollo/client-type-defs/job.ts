import gql from 'graphql-tag';

export const jobTypeDef = gql`
  extend type Mutation {
    updateJobList(companySlug: String!, input: JobInput!): Boolean!
  }
`;
