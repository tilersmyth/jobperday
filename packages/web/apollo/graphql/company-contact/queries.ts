import gql from 'graphql-tag';

export const findCompanyContactQuery = gql`
  fragment CompanyContactParts on CompanyContactDto {
    id
    phone
    address {
      id
      street
      street2
      city
      state
      postal_code
      country
      coord_lat
      coord_lng
    }
  }

  query FindCompanyContact($companySlug: String!) {
    findCompanyContact(companySlug: $companySlug) {
      ...CompanyContactParts
    }
  }
`;
