import gql from 'graphql-tag';

export const uiTypeDef = gql`
  extend type Mutation {
    viewportType(type: String!): Boolean!
  }

  extend type Query {
    viewportType: String!
  }
`;
