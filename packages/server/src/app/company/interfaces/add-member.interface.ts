import { MemberRoles } from '@jobperday/common';

import { CompanyEntity } from '../entity';
import { UserEntity } from '../../user/entity';

export interface AddMember {
  company: CompanyEntity;
  user: UserEntity;
  role: MemberRoles;
  confirmed: boolean;
}
