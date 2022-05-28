import axios, { AxiosError } from 'axios';

export function isAxiosError<T>(e: unknown): e is AxiosError<T> {
  return axios.isAxiosError(e);
}
