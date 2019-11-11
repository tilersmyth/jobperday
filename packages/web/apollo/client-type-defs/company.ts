import gql from 'graphql-tag';

export const companyTypeDef = gql`
  extend type Query {
    setCompany: Boolean!
    currentCompany: CurrentCompanyDto!
  }
`;
