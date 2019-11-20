import gql from 'graphql-tag';

export const findCompanyContactQuery = gql`
  fragment CompanyContactParts on CompanyContactDto {
    id
    phone
    address {
      ...AddressParts
    }
  }

  query FindCompanyContact($companySlug: String!) {
    findCompanyContact(companySlug: $companySlug) {
      ...CompanyContactParts
    }
  }
`;

export const findCompanyAddressesQuery = gql`
  query FindCompanyAddresses($companySlug: String!) {
    findCompanyAddresses(companySlug: $companySlug) {
      ...AddressParts
    }
  }
`;
