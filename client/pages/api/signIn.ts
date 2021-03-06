import { Request, Response } from 'express';
import { NestApi } from '../../utils/axios';
import { NEST_API_PATHS } from '../../utils/constants';
import { handleApiError } from '../../utils/handleError';
import { TokenResponse } from '../../utils/types';
import { handleTokenResponse } from '../../utils/handleTokenResponse';

export default async function handler(req: Request, res: Response) {
  try {
    const { data } = await NestApi.post<TokenResponse>(
      NEST_API_PATHS.signIn,
      req.body,
    );
    handleTokenResponse(data, res);
  } catch (error) {
    return handleApiError(error, res);
  }
}
