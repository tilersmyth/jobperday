import { parseCookies, setCookie, destroyCookie } from 'nookies';
import base64 from 'base-64';

import {
  LocationInput,
  UserIpLocationQuery,
  UserIpLocationDocument,
  UserGoogleLocationDocument,
  UserGoogleLocationQuery,
} from '../../apollo/generated-components';
import { NextPageContextApollo } from '../../types';
import { LocationCookieEnum } from '../enums';

export class SearchLocationUtil {
  constructor(private ctx?: NextPageContextApollo) {}

  public getCookie = (): LocationInput | null => {
    const cookies = parseCookies(this.ctx);
    if (!cookies[LocationCookieEnum.LOC_ID]) {
      return null;
    }
    return JSON.parse(base64.decode(cookies[LocationCookieEnum.LOC_ID]));
  };

  public setCookie = (location: LocationInput) => {
    const encoded = base64.encode(JSON.stringify(location));
    setCookie(this.ctx, LocationCookieEnum.LOC_ID, encoded, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  };

  public destroyCookie = () => {
    destroyCookie(this.ctx, LocationCookieEnum.LOC_ID);
  };

  public googleApi = async (
    address: string | string[],
  ): Promise<UserGoogleLocationQuery['userGoogleLocation']> => {
    if (!this.ctx) {
      return null;
    }

    const client = this.ctx.apolloClient;
    const { data } = await client.query<UserGoogleLocationQuery>({
      query: UserGoogleLocationDocument,
      variables: { address },
    });
    return data && data.userGoogleLocation;
  };

  public apolloOutput = (location: LocationInput) => {
    return {
      locality: location.locality,
      __typename: 'SessionLocationDto',
      coords: {
        lat: location.coords.lat,
        lng: location.coords.lng,
        __typename: 'SessionCoordsDto',
      },
    };
  };

  public ipLocation = async (): Promise<
    UserIpLocationQuery['userIpLocation']
  > => {
    if (!this.ctx) {
      return null;
    }

    const client = this.ctx.apolloClient;
    const { data } = await client.query<UserIpLocationQuery>({
      query: UserIpLocationDocument,
    });
    return data && data.userIpLocation;
  };
}
