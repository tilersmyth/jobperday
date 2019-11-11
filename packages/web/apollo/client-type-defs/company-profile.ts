import gql from 'graphql-tag';

export const companyProfileTypeDef = gql`
  extend type Mutation {
    updateCompanyProfileClient(input: UpdateCompanyProfileInput!): Boolean!
  }
`;
