import gql from 'graphql-tag';

export const createCompanyMutation = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
      slug
      name
    }
  }
`;

export const updateCompanyMutation = gql`
  mutation UpdateCompany($companySlug: String!, $input: UpdateCompanyInput!) {
    updateCompany(companySlug: $companySlug, input: $input) {
      id
      slug
      name
    }
  }
`;
