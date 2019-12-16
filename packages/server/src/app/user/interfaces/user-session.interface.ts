import { UserProfile } from './user.interface';
import { UserLocation } from '../../user-location/interfaces/location.interface';

export interface UserSession extends UserProfile {
  location?: UserLocation;
}
