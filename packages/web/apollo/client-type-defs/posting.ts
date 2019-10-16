import gql from 'graphql-tag';

export const postingTypeDef = gql`
  extend type Mutation {
    createPostingClient(postingId: ID!, companySlug: String!): Boolean!
  }
`;
