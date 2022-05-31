import { Roles } from "./types";

export const baseNestServerURL = 'http://localhost:5001/api' as const;
export const baseNextServerURL = '/api' as const;

export const NEST_API_PATHS = {
  signIn: 'auth/login',
  check: 'auth/check',
  verify: 'auth/verify',
  signUp: 'auth/registration',
} as const;

export const NEXT_API_PATHS = {
  signIn: '/signIn',
  check: '/check',
  signOut: '/signOut',
  signUp: '/signUp',
} as const;

export const COOKIE_EXPIRES_IN = 172_800 as const; // 2 days
export const COOKIE_NAME = 'userToken' as const;

export enum APP_PATHS {
  main = '/',
  signIn = '/signIn',
  signUp = '/signUp',
  admin = '/admin',
  animation = '/animation',
  todos = '/todos',
  forbidden = '/forbidden',
}

export const UNAVAILABLE_WHEN_SIGNED_IN_PATHS = [APP_PATHS.signIn, APP_PATHS.signUp];
export const PRIVATE_PATHS = [APP_PATHS.admin, APP_PATHS.todos];

type RequiredRolesByPath = Partial<Record<APP_PATHS, Roles[]>>;
export const REQUIRED_ROLES_BY_PATH: RequiredRolesByPath = {
  [APP_PATHS.admin]: [Roles.ADMIN],
  [APP_PATHS.todos]: [Roles.ADMIN, Roles.USER],
}