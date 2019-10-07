export declare type MemberRoles = 'owner' | 'admin' | 'manager' | 'associate';
export declare const memberRoles: MemberRoles[];
export declare const isMemberAuth: (requiredRole: MemberRoles, userRole: MemberRoles) => boolean;
