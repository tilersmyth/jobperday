import gql from 'graphql-tag';

export const findAllApplicationsQuery = gql`
  fragment ApplicationParts on ApplicationDto {
    id
    title
    created_at
  }

  query FindAllApplications($companySlug: String!) {
    findAllApplications(companySlug: $companySlug) {
      ...ApplicationParts
    }
  }

  query FindApplication($id: ID!) {
    findApplication(id: $id) {
      ...ApplicationParts
      fields {
        id
        question
        required
        type
        options
      }
    }
  }
`;
