import { isAxiosError } from 'axios';

export const getResponseErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data.message ?? error.message;
  }

  return 'Internal server error';
};
