import { UserRealm } from '../../types';
import { SearchLocation } from '../../search/interfaces/search-location.interface';

export interface MeSession {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  realm: UserRealm;
  search?: SearchLocation;
}
