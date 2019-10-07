import gql from 'graphql-tag';

export const findEmployerCompaniesQuery = gql`
  query FindEmployerCompanies {
    findEmployerCompanies {
      id
      role
      company {
        name
        slug
        setup_complete
      }
    }
  }
`;

export const findEmployerCompanyQuery = gql`
  query FindEmployerCompany($companySlug: String!) {
    findEmployerCompany(companySlug: $companySlug) {
      name
      slug
      setup_complete
      member {
        role
      }
    }
  }
`;
