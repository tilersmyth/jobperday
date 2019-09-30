import gql from 'graphql-tag';

export const findCompanyQuery = gql`
  query FindCompany($input: CompanySlugInput!) {
    findCompany(input: $input) {
      id
      slug
      name
      setup_stage
      setup_complete
    }
  }
`;
