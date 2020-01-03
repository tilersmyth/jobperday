import gql from 'graphql-tag';

export const findCompaniesQuery = gql`
  query FindCompanies {
    findCompanies {
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

export const findCompanyMembersQuery = gql`
  fragment CompanyMemberParts on CompanyMemberDto {
    id
    role
    user {
      email
      first_name
      last_name
    }
  }

  query FindCompanyMembers($companySlug: String!) {
    findCompanyMembers(companySlug: $companySlug) {
      ...CompanyMemberParts
    }
  }
`;
