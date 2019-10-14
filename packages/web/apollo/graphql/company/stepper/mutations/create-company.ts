import gql from 'graphql-tag';

export const createCompanyMutation = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      slug
    }
  }
`;

export const updateCreateCompanyMutation = gql`
  mutation UpdateCreateCompany(
    $companySlug: String!
    $input: UpdateCompanyInput!
  ) {
    updateCreateCompany(companySlug: $companySlug, input: $input) {
      id
      slug
      name
      phone
      address {
        street
        street2
        city
        state
        postal_code
        country
        coord_lat
        coord_lng
      }
    }
  }
`;
