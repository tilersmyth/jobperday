import gql from 'graphql-tag';

export const uiTypeDef = gql`
  enum BreakpointEnum {
    XS
    SM
    MD
    LG
    XL
    XXL
  }

  extend type Mutation {
    viewport(breakpoint: BreakpointEnum!): BreakpointEnum!
  }

  extend type Query {
    viewport: BreakpointEnum!
  }
`;
