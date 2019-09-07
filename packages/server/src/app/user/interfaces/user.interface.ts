import { UserRealm } from '../../types';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  realm: UserRealm;
}
