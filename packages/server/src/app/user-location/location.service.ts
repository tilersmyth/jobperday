import { Injectable } from '@nestjs/common';
import geoIp from 'geoip-lite';
import GoogleMaps from '@google/maps';

import { config } from '../../config';
import { AppLogger } from '../app.logger';
import { USER_LOC_TEST_IP } from './location.constants';
import { UserLocationDto } from './dto';

const googleApiClient = GoogleMaps.createClient({
  key: config.google.key,
  Promise,
});

@Injectable()
export class UserLocationService {
  private logger = new AppLogger(UserLocationService.name);

  public async clientIp(ip: string): Promise<UserLocationDto | null> {
    // request-ip package returns 127.0.0.1 for localhost,
    // so for testing/dev we will replace with known IP
    if (ip === '127.0.0.1' && config.env !== 'production') {
      ip = USER_LOC_TEST_IP;
    }

    const geo = geoIp.lookup(ip);

    if (!geo) {
      this.logger.log(`[GEO_IP]: FAILED with IP: ${ip}`);
      return null;
    }

    this.logger.log(`[GEO_IP]: SUCCESS with IP: ${ip}`);

    const locality = `${geo.city}, ${geo.region}, ${geo.country}`;

    return {
      locality,
      coords: {
        lat: geo.ll[0],
        lng: geo.ll[1],
      },
    };
  }

  public async googleApi(address: string): Promise<UserLocationDto | null> {
    const { json } = await googleApiClient.geocode({ address }).asPromise();

    if (json.results.length === 0) {
      this.logger.log(`[GoogleMapsApi]: FAILED with address: ${address}`);
      return null;
    }

    this.logger.log(`[GoogleMapsApi]: SUCCESS with address: ${address}`);

    const result = json.results[0];

    return {
      locality: result.formatted_address,
      coords: {
        ...result.geometry.location,
      },
    };
  }
}
