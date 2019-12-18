import { ApolloCache } from 'apollo-cache';
import ApolloClient from 'apollo-client';
import Router from 'next/router';

import {
  MeDocument,
  MeQuery,
  LocationStorageTypeEnum,
  SearchInput,
} from '../generated-components';
import { NextPageContextApollo } from '../../types';
import { argsQueryString, SearchLocationUtil } from '../../utils';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
  client: ApolloClient<{}>;
  nextCtx?: NextPageContextApollo;
}

interface UrlQuery {
  locationParam: string;
}

export const userResolvers = {
  Mutation: {
    setUserLocation: (
      _root: any,
      {
        searchArgs,
        type,
      }: { searchArgs: SearchInput; type: LocationStorageTypeEnum },
      { client }: ApolloContext,
    ) => {
      const locationUtil = new SearchLocationUtil();

      const data = client.readQuery<MeQuery>({ query: MeDocument });

      if (!data) {
        throw Error('Error querying local state');
      }

      const localLoc = locationUtil.getCookie();

      if (data.me) {
        if (localLoc) {
          locationUtil.destroyCookie();
        }

        if (
          !data.me.location ||
          data.me.location.locality !== searchArgs.location.locality
        ) {
          const newLocation = locationUtil.apolloOutput(searchArgs.location);
          client.cache.writeData({
            data: {
              currentUser: {
                ...data.me,
                location: newLocation,
              },
            },
          });
        }
      }

      if (!data.me) {
        if (!localLoc || localLoc.locality !== searchArgs.location.locality) {
          locationUtil.setCookie(searchArgs.location);
        }
      }

      if (type === LocationStorageTypeEnum.Google) {
        // Update url with location param if from Google API
        const href = argsQueryString(searchArgs);
        const as = href;
        Router.push(href, as, { shallow: true });
      }

      return true;
    },
  },
  Query: {
    async getSearchLocation(
      _root: any,
      { locationParam }: UrlQuery,
      { client, nextCtx }: ApolloContext,
    ) {
      const data = client.readQuery<MeQuery>({ query: MeDocument });

      if (data && data.me) {
        const sessionLoc = data.me.location;
        if (sessionLoc && sessionLoc.locality === locationParam) {
          return {
            type: LocationStorageTypeEnum.Local,
            __typename: 'LocationStorageDto',
            location: sessionLoc,
          };
        }
      }

      const locationUtil = new SearchLocationUtil(nextCtx);

      const localLoc = locationUtil.getCookie();
      if (localLoc) {
        if (localLoc && localLoc.locality === locationParam) {
          return {
            type: LocationStorageTypeEnum.Local,
            __typename: 'LocationStorageDto',
            location: locationUtil.apolloOutput(localLoc),
          };
        }
      }

      const googleLoc = await locationUtil.googleApi(locationParam);
      if (googleLoc) {
        return {
          type: LocationStorageTypeEnum.Google,
          __typename: 'LocationStorageDto',
          location: locationUtil.apolloOutput(googleLoc),
        };
      }

      return null;
    },
    async getNonSearchLocation(
      _root: any,
      _args: any,
      { client, nextCtx }: ApolloContext,
    ) {
      const data = client.readQuery<MeQuery>({ query: MeDocument });

      if (data && data.me && data.me.location) {
        return data.me.location;
      }

      const locationUtil = new SearchLocationUtil(nextCtx);

      const localLoc = locationUtil.getCookie();
      if (localLoc) {
        return locationUtil.apolloOutput(localLoc);
      }

      const serverLoc = await locationUtil.ipLocation();
      if (serverLoc) {
        return serverLoc;
      }

      return null;
    },
  },
};
