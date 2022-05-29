import { handleApiError } from './handleError';
import { TokenResponse } from './types';
import { Response } from 'express';
import { serialize } from 'cookie';
import { COOKIE_EXPIRES_IN, COOKIE_NAME } from './constants';

export function handleTokenResponse(
  data: TokenResponse,
  res: Response,
): Response {
  const { token, user } = data;
  const rolesToList = user.roles.map(({ value }) => value);
  if (!token) {
    return handleApiError(new Error('Incorrect token'), res);
  }
  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: COOKIE_EXPIRES_IN,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
  return res.status(200).json({
    ...data.user,
    roles: rolesToList,
  });
}
