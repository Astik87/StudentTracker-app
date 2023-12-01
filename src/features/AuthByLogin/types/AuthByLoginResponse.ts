import { User } from '@/entities/User';

export type AuthByLoginResponse = {
  id: number;
  refreshToken: string;
  accessToken: string;
  user: User;
  created_at: string;
  updated_at: string;
};
