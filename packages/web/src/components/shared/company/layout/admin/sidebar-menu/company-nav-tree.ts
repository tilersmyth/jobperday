import { MemberRoles } from '@jobperday/common';
import { IIconType } from '../../../../icon';

export interface NavTree {
  route: string;
  title: string;
  icon: IIconType;
  role: MemberRoles;
  subMenu?: NavTree[];
}

export const companyNavTree: NavTree[] = [
  {
    route: '',
    title: 'Home',
    icon: 'dashboard-line',
    role: 'associate',
  },
  {
    route: '/applicants',
    title: 'Applicants',
    icon: 'file-user-line',
    role: 'associate',
  },
  {
    route: '/postings',
    title: 'Postings',
    icon: 'push-pin-line',
    role: 'associate',
  },
  {
    route: '/jobs',
    title: 'Jobs',
    icon: 'tools-line',
    role: 'associate',
  },
  {
    route: '/applications',
    title: 'Applications',
    icon: 'file-text-line',
    role: 'associate',
  },
  {
    route: '/account',
    title: 'Account',
    icon: 'store-2-line',
    role: 'associate',
    subMenu: [
      {
        route: '/profile',
        title: 'Profile',
        icon: 'profile-line',
        role: 'associate',
      },
      {
        route: '/team',
        title: 'Team',
        icon: 'group-line',
        role: 'associate',
      },
    ],
  },
];
