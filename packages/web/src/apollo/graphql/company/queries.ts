import gql from 'graphql-tag';

export const findCompanyQuery = gql`
  fragment CompanyParts on CurrentCompanyDto {
    id
    name
    slug
    setup_complete
    setup_stage
    members {
      role
    }
  }

  query FindCompany($companySlug: String!) {
    findCompany(companySlug: $companySlug) {
      ...CompanyParts
    }
    setCompany @client
  }
`;

export const currentCompanyQuery = gql`
  query CurrentCompany {
    currentCompany @client {
      ...CompanyParts
    }
  }
`;

export const generateCompanySlugQuery = gql`
  query GenerateCompanySlug($name: String!) {
    generateCompanySlug(name: $name)
  }
`;

export const findCompanySlugQuery = gql`
  query FindCompanySlug($name: String!) {
    findCompanySlug(name: $name)
  }
`;
