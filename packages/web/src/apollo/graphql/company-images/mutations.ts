import gql from 'graphql-tag';

export const uploadImageMutation = gql`
  mutation UploadImage($companySlug: String!, $input: UploadImageInput!) {
    uploadImage(companySlug: $companySlug, input: $input) {
      id
      filename
      path
      thumb
      awsKey
    }
  }
`;
