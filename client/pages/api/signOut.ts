import { Request, Response } from 'express';
import { COOKIE_NAME } from '../../utils/constants';
import { serialize } from 'cookie';

export default async function handler(req: Request, res: Response) {
  const { cookies } = req;
  const jwt = cookies[COOKIE_NAME];

  if (!jwt) {
    return res.json({ message: 'You are not signed in' });
  } else {
    const serialized = serialize(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    return res.send('Ok');
  }
}
