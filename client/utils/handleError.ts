import { isAxiosError } from './typeGuards';
import { showNotification } from '@mantine/notifications';
import { ServerError } from './types';
import { Response } from 'express';

export function handleClientError(error: unknown, title?: string): void {
  let message: string | undefined = undefined;
  if (isAxiosError<ServerError>(error)) {
    message = error?.response?.data?.message;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  showNotification({
    title,
    message,
    color: 'red',
  });
}

export function handleApiError(error: unknown, res: Response): Response {
  if (isAxiosError(error)) {
    return res.status(error.response?.status || 500).json(error.response?.data);
  } else if (error instanceof Error) {
    return res.status(500).json({ message: error?.message });
  }
  return res.status(500).json({ message: 'unknown error' });
}
