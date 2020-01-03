import gql from 'graphql-tag';

export const companyContactTypeDef = gql`
  extend type Mutation {
    updateCompanyContactClient(input: UpdateCompanyContactInput!): Boolean!
  }
`;
