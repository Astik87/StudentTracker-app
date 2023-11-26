import { UserSchema } from '@/entities/User';

export type StateSchema = {
  user: UserSchema;
};

export type ThunkConfig<T> = {
  rejectValue: T;
  state: StateSchema;
};
