import axios from 'axios';
import { baseNestServerURL, baseNextServerURL } from './constants';

const NestApi = axios.create({
  baseURL: baseNestServerURL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

const NextApi = axios.create({
  baseURL: baseNextServerURL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export { NestApi, NextApi };
