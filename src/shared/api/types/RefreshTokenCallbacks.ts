import { AxiosError } from 'axios/index';

export type OnRefreshToken = (
  accessToken: string,
  refreshToken: string,
) => void;
export type OnRefreshTokenError = (error: AxiosError) => void;
