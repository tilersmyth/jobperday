import gql from 'graphql-tag';

export const createCompanyMembersQuery = gql`
  query FindCreateCompanyMembers($input: CompanySlugInput!) {
    findCreateCompanyMembers(input: $input) {
      id
      role
      user {
        first_name
        last_name
        email
      }
    }
  }
`;
