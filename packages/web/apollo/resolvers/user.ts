import { MeClientDocument } from '../generated-components';

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, { client }: any) => {
      return client.query({ query: MeClientDocument });
    },
  },
};
