import { Request, Response } from 'express';
import { NestApi } from '../../utils/axios';
import {
  NEST_API_PATHS,
  COOKIE_EXPIRES_IN,
  COOKIE_NAME,
} from '../../utils/constans';
import { handleApiError } from '../../utils/handleError';
import { TokenResponse } from '../../utils/types';
import { serialize } from 'cookie';

export default async function handler(req: Request, res: Response) {
  try {
    const { data } = await NestApi.post<TokenResponse>(
      NEST_API_PATHS.signIn,
      req.body,
    );
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
    res.status(200).json({
      ...data.user,
      roles: rolesToList,
    });
  } catch (error) {
    return handleApiError(error, res);
  }
}
