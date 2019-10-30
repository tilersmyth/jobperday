import gql from 'graphql-tag';

export const findAllApplicationsQuery = gql`
  fragment ApplicationParts on ApplicationDto {
    id
    title
  }

  query FindAllApplications($companySlug: String!) {
    findAllApplications(companySlug: $companySlug) {
      ...ApplicationParts
    }
  }
`;
