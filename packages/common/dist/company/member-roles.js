"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoles = [
    'owner',
    'admin',
    'manager',
    'associate',
];
exports.isMemberAuth = (requiredRole, userRole) => exports.memberRoles.indexOf(requiredRole) >= exports.memberRoles.indexOf(userRole);
