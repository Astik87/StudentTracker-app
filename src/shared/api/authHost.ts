import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import { apiConfig } from './config.ts';
import { host } from './host.ts';
import { RefreshTokenResponse } from './types/RefreshTokenResponse.ts';
import {
  OnRefreshToken,
  OnRefreshTokenError,
} from './types/RefreshTokenCallbacks.ts';

import { StateSchema } from '@/app/providers/StoreProvider';

const authHost = axios.create({
  baseURL: apiConfig.host,
});

type Store = ToolkitStore<StateSchema>;
type RequestItem = (token: string) => void;

let store: Store | null = null;
let onRefreshToken: OnRefreshToken | null = null;
let onRefreshTokenError: OnRefreshTokenError | null = null;

let tokenIsRefreshing: boolean = false;
const requests: RequestItem[] = [];

export const initAuthHost = (
  _store: ToolkitStore<StateSchema>,
  _onRefreshToken: OnRefreshToken,
  _onRefreshTokenError: OnRefreshTokenError,
) => {
  store = _store;
  onRefreshToken = _onRefreshToken;
  onRefreshTokenError = _onRefreshTokenError;
};

const authHostRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!store) {
    return config;
  }

  const { accessToken, refreshToken } = store.getState().user;

  if (accessToken && refreshToken) {
    config.headers.setAuthorization('Bearer ' + accessToken);
  }

  return config;
};

const authHostResponseErrorInterceptor = (error: AxiosError) =>
  new Promise<AxiosResponse>(async (resolve, reject) => {
    if (error.response?.status !== 401) {
      return reject(error);
    }

    const refreshToken = store?.getState().user.refreshToken;

    if (!refreshToken || !error.config) {
      reject(error);
      return;
    }

    if (tokenIsRefreshing) {
      requests.push((token) => {
        if (!error.config) {
          reject(error);
          return;
        }

        error.config.headers.setAuthorization('Bearer ' + token);
        axios(error.config).then(resolve).catch(reject);
      });
      return;
    }

    tokenIsRefreshing = true;

    try {
      const refreshTokenResponse: AxiosResponse<RefreshTokenResponse> =
        await host.post('/users/auth/refresh-token', { refreshToken });

      if (onRefreshToken) {
        onRefreshToken(
          refreshTokenResponse.data.accessToken,
          refreshTokenResponse.data.refreshToken,
        );
      }

      for (const request of requests) {
        request(refreshTokenResponse.data.accessToken);
      }

      const requestConfig = {
        ...error.config,
        headers: {
          ...error.config.headers,
          Authorization: 'Bearer ' + refreshTokenResponse.data.accessToken,
        },
      };

      axios(requestConfig).then(resolve).catch(reject);
    } catch (refreshTokenError) {
      onRefreshTokenError?.(refreshTokenError as AxiosError);
      reject(error);
    }
  });

authHost.interceptors.request.use(authHostRequestInterceptor);
authHost.interceptors.response.use(
  (config) => config,
  authHostResponseErrorInterceptor,
);

export { authHost };
