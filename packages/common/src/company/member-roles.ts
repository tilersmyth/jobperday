export type MemberRoles = 'owner' | 'admin' | 'manager' | 'associate';

export const memberRoles: MemberRoles[] = [
  'owner',
  'admin',
  'manager',
  'associate',
];

export const isMemberAuth = (
  requiredRole: MemberRoles,
  userRole: MemberRoles,
) => memberRoles.indexOf(requiredRole) >= memberRoles.indexOf(userRole);
