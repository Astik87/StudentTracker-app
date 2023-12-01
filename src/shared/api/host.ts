import axios from 'axios';

import { apiConfig } from './config.ts';

export const host = axios.create({
  baseURL: apiConfig.host,
});
