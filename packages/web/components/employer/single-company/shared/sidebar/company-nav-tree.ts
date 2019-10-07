import { MemberRoles } from '@jobperday/common';

interface NavTree {
  route: string;
  title: string;
  icon: string;
  role: MemberRoles;
  subMenu?: NavTree[];
}

export const companyNavTree: NavTree[] = [
  {
    route: '/',
    title: 'Home',
    icon: 'dashboard',
    role: 'associate',
  },
  {
    route: '/job-postings',
    title: 'Postings',
    icon: 'pushpin',
    role: 'associate',
  },
  {
    route: '/jobs',
    title: 'Jobs',
    icon: 'form',
    role: 'associate',
  },
  {
    route: '/account',
    title: 'Account',
    icon: 'shop',
    role: 'associate',
    subMenu: [
      {
        route: '/profile',
        title: 'Profile',
        icon: 'profile',
        role: 'associate',
      },
      {
        route: '/team',
        title: 'Team',
        icon: 'team',
        role: 'associate',
      },
    ],
  },
];
