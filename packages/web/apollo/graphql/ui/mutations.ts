import gql from 'graphql-tag';

export const setViewportMutation = gql`
  mutation ViewportTypeMutation($type: String!) {
    viewportType(type: $type) @client
  }
`;
