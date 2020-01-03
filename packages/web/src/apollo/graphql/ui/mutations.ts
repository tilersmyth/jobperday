import gql from 'graphql-tag';

export const viewportMutation = gql`
  mutation ViewportMutation($breakpoint: BreakpointEnum!) {
    viewport(breakpoint: $breakpoint) @client
  }
`;
