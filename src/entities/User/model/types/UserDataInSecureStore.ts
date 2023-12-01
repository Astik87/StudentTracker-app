import { User } from './User.ts';

export type UserDataInSecureStore = {
  user: User;
  refreshToken: string;
};
