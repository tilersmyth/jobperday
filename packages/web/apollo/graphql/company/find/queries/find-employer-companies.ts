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
  fragment CompanyParts on EmployerCompanyDto {
    id
    name
    slug
    setup_complete
    member {
      role
    }
  }

  query FindEmployerCompany($companySlug: String!) {
    findEmployerCompany(companySlug: $companySlug) {
      ...CompanyParts
    }
    setCompany @client
  }

  query CurrentCompany {
    currentCompany @client {
      ...CompanyParts
    }
  }
`;
