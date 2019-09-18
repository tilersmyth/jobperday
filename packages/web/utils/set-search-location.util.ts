import { parseCookies, setCookie } from 'nookies';
import base64 from 'base-64';

import { MeQuery, LocationInput } from '../apollo/generated-components';
import { NextPageContextApollo } from '../types';

// Get coordinates for searched location
// 1. If user logged in, look for location in session
// 2. Else, look for location in cookie
// 3. Else, hit Google Places API
// 4. redirect if error or invalid location

export const setSearchLocation = async (
  me: MeQuery['me'] | null,
  ctx: NextPageContextApollo,
): Promise<LocationInput | null> => {
  try {
    const { location } = ctx.query;

    if (me && me.search) {
      return me.search;
    }

    const cookies = parseCookies(ctx);
    if (cookies.jpd_loc) {
      const jpdLoc: LocationInput = JSON.parse(base64.decode(cookies.jpd_loc));
      if (location === jpdLoc.locality) {
        return jpdLoc;
      }
    }

    console.log('HIT GOOGLE API');

    const queryApi = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${process.env.GOOGLE_PLACES_API}`,
    );

    const { results } = await queryApi.json();

    if (results.length === 0) {
      throw Error('Google Places API was unable to fetch any results');
    }

    const googleLoc = results[0];

    if (location === googleLoc.formatted_address) {
      const googleResults: LocationInput = {
        locality: googleLoc.formatted_address,
        coords: {
          ...googleLoc.geometry.location,
        },
      };

      const encoded = base64.encode(JSON.stringify(googleResults));

      setCookie(ctx, 'jpd_loc', encoded, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      return googleResults;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
