import gql from 'graphql-tag';

export const createCompanyContactMutation = gql`
  mutation CreateCompanyContact(
    $companySlug: String!
    $input: CompanyContactInput!
  ) {
    createCompanyContact(companySlug: $companySlug, input: $input) {
      ...CompanyContactParts
    }
  }
`;

export const updateCompanyContactMutation = gql`
  mutation UpdateCompanyContact(
    $companySlug: String!
    $input: UpdateCompanyContactInput!
  ) {
    updateCompanyContact(companySlug: $companySlug, input: $input) {
      ...CompanyContactParts
    }
  }
`;

export const updateCompanyContactClientMutation = gql`
  mutation UpdateCompanyContactClient($input: UpdateCompanyContactInput!) {
    updateCompanyContactClient(input: $input) @client
  }
`;
