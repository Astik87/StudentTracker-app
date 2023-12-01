import { UserRole } from './UserRole.ts';

export type User = {
  id: number;
  lastName: string;
  firstName: string;
  patronymic: string | null;
  fullName: string;
  login: string;
  password: string;
  roles?: UserRole[];
  created_at: string;
  updated_at: string;
};
