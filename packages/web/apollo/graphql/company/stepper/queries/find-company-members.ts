import gql from 'graphql-tag';

export const createCompanyMembersQuery = gql`
  query FindCreateCompanyMembers($companySlug: String!) {
    findCreateCompanyMembers(companySlug: $companySlug) {
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
