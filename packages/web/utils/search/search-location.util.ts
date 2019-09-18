import { parseCookies, setCookie } from 'nookies';
import base64 from 'base-64';

import {
  MeQuery,
  LocationInput,
  UserLocationDocument,
  UserLocationQuery,
} from '../../apollo/generated-components';
import { NextPageContextApollo } from '../../types';

// Methods for finding user's default search location
export class SearchLocation {
  constructor(
    private me: MeQuery['me'] | null,
    private ctx: NextPageContextApollo,
  ) {}

  private setCookie = (location: string) => {
    setCookie(this.ctx, 'jpd_loc', location, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  };

  /*
    Start find address methods
    */

  private session = (): LocationInput | null => this.me && this.me.search;

  private getCookie = (): LocationInput | null => {
    const cookies = parseCookies(this.ctx);
    if (!cookies.jpd_loc) {
      return null;
    }
    return JSON.parse(base64.decode(cookies.jpd_loc));
  };

  private googleApi = async (
    location: string | string[],
  ): Promise<LocationInput | null> => {
    try {
      const queryApi = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${process.env.GOOGLE_PLACES_API}`,
      );

      const { results } = await queryApi.json();

      if (results.length === 0) {
        throw Error('Google Places API was unable to fetch any results');
      }

      const googleLoc = results[0];

      if (location !== googleLoc.formatted_address) {
        console.log('stored address did not match google API address');
        return null;
      }

      const googleResults: LocationInput = {
        locality: googleLoc.formatted_address,
        coords: {
          ...googleLoc.geometry.location,
        },
      };

      const encoded = base64.encode(JSON.stringify(googleResults));

      this.setCookie(encoded);

      return googleResults;
    } catch (error) {
      throw error;
    }
  };

  private ipAddress = async (): Promise<LocationInput | null> => {
    const client = this.ctx.apolloClient;
    const { data } = await client.query<UserLocationQuery | null>({
      query: UserLocationDocument,
    });
    return data && data.userLocation;
  };

  /*
    End find address methods
    */

  // Find by matching to location query param (search page)
  // 1. If user logged in, look for location in session
  // 2. Else, look for location in cookie
  // 3. Else, hit Google Places API
  // 4. redirect if error or invalid location
  public find = async (
    location: string | string[],
  ): Promise<LocationInput | null> => {
    const session = this.session();
    if (session && session.locality === location) {
      return session;
    }

    const cookie = this.getCookie();
    if (cookie && cookie.locality === location) {
      return cookie;
    }

    return this.googleApi(location);
  };

  // Set location if stored or falling back to location of IP
  // 1. If user logged in, look for location in session
  // 2. Else, look for location in cookie
  // 3. Else, find server IP
  public set = async (): Promise<LocationInput | null> => {
    const session = this.session();
    if (session) {
      return session;
    }

    const cookie = this.getCookie();
    if (cookie) {
      return cookie;
    }

    return this.ipAddress();
  };
}
