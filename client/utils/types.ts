export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type Role = {
  value: string;
};

export type User = {
  email: string;
  id: number;
  roles: Role[];
};

export type UserMapped = {
  email: string;
  id: number;
  roles: Roles[];
};

export type TokenResponse = {
  token: string;
  user: User;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type ServerError = {
  message: string;
  statusCode: number;
};
