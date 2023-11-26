import axios from 'axios';

import { apiConfig } from './config.ts';

console.log(apiConfig);

export const host = axios.create({
  baseURL: apiConfig.host,
});
