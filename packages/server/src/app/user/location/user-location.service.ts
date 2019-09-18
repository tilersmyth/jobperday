import { Injectable } from '@nestjs/common';
import geoIp from 'geoip-lite';

import { AppLogger } from '../../app.logger';
import { config } from '../../../config';
import { USER_LOC_TEST_IP } from '../user.constants';
import { SearchLocation } from '../../search/interfaces/search-location.interface';

@Injectable()
export class UserLocationService {
  private logger = new AppLogger(UserLocationService.name);

  public async find(ip: string): Promise<SearchLocation | null> {
    // request-ip package returns 127.0.0.1 for localhost,
    // so for testing/dev we will replace with known IP
    if (ip === '127.0.0.1' && config.env !== 'production') {
      ip = USER_LOC_TEST_IP;
    }

    const geo = geoIp.lookup(ip);

    if (!geo) {
      return null;
    }

    const locality = `${geo.city}, ${geo.region}, ${geo.country}`;

    return {
      locality,
      coords: {
        lat: geo.ll[0],
        lng: geo.ll[1],
      },
    };
  }
}
