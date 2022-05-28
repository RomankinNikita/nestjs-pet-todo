export const baseNestServerURL = 'http://localhost:5001/api' as const;
export const baseNextServerURL = '/api' as const;

export const NEST_API_PATHS = {
  signIn: 'auth/login',
  signUp: 'auth/registration',
} as const;

export const NEXT_API_PATHS = {
  signIn: '/signIn',
  signOut: '/signOut',
  signUp: '/signUp',
} as const;

export const COOKIE_EXPIRES_IN = 172_800 as const; // 2 days
export const COOKIE_NAME = 'userToken' as const;

export const APP_PATHS = {
  main: '/',
  signIn: 'signIn',
  signUp: 'signUp',
  admin: 'admin',
} as const;
