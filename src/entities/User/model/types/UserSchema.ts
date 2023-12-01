import { User } from './User.ts';

export type UserSchema = {
  isAuth: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
};
