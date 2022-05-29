import { Request, Response } from 'express';
import { NestApi } from '../../utils/axios';
import { NEST_API_PATHS, COOKIE_NAME } from '../../utils/constants';
import { handleApiError } from '../../utils/handleError';
import { TokenResponse } from '../../utils/types';
import { getAuthorizationHeader } from '../../utils/getAuthorizationHeader';
import { handleTokenResponse } from '../../utils/handleTokenResponse';

export default async function handler(req: Request, res: Response) {
  const { cookies } = req;
  const jwt = cookies[COOKIE_NAME];

  if (!jwt) {
    return res.end();
  }

  try {
    const { data } = await NestApi.get<TokenResponse>(NEST_API_PATHS.check, {
      headers: getAuthorizationHeader(jwt),
    });
    handleTokenResponse(data, res);
  } catch (error) {
    return handleApiError(error, res);
  }
}
