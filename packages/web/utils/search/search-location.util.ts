import { parseCookies, setCookie, destroyCookie } from 'nookies';
import base64 from 'base-64';

import {
  LocationInput,
  UserLocationQuery,
  UserLocationDocument,
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
    location: string | string[],
  ): Promise<LocationInput | null> => {
    console.log('HIT GOOGLE');
    try {
      const queryApi = await fetch(
        // tslint:disable-next-line:max-line-length
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,geometry&key=${process.env.GOOGLE_PLACES_API}`,
      );

      const { candidates } = await queryApi.json();

      if (candidates.length === 0) {
        return null;
      }

      const googleLoc = candidates[0];

      return {
        locality: googleLoc.formatted_address,
        coords: {
          ...googleLoc.geometry.location,
        },
      };
    } catch (error) {
      throw error;
    }
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

  public ipAddress = async (): Promise<LocationInput | null> => {
    if (!this.ctx) {
      return null;
    }

    const client = this.ctx.apolloClient;
    const { data } = await client.query<UserLocationQuery | null>({
      query: UserLocationDocument,
    });
    return data && data.userLocation;
  };
}
