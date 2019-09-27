import gql from 'graphql-tag';

export const findCompanyQuery = gql`
  query FindCompany($input: CompanySlugInput!) {
    findCompany(input: $input) {
      id
      slug
      setup_stage
      setup_complete
    }
  }
`;
