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
  mutation UpdateCreateCompany($input: UpdateCompanyInput!) {
    updateCreateCompany(input: $input) {
      id
      slug
      name
      address {
        phone
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
