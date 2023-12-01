import { AxiosResponse } from 'axios';

import { AuthByLoginResponse } from '../types/AuthByLoginResponse.ts';

import { host } from '@/shared/api/host.ts';

export const authByLoginRequest = async (login: string, password: string) => {
  const response: AxiosResponse<AuthByLoginResponse> = await host.post(
    '/users/auth/by-login',
    { login, password },
  );

  return response.data;
};
