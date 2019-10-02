import gql from 'graphql-tag';

export const findCompanyQuery = gql`
  query FindCompany($companySlug: String!) {
    findCompany(companySlug: $companySlug) {
      id
      slug
      name
      setup_stage
      setup_complete
    }
  }
`;
