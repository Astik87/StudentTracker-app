import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchema } from '../types/UserSchema.ts';
import { User } from '../types/User.ts';

const initialState: UserSchema = {
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string | undefined>) {
      state.accessToken = payload;
    },

    setRefreshToken(state, { payload }: PayloadAction<string | undefined>) {
      state.refreshToken = payload;
    },

    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },

    setUser(state, { payload }: PayloadAction<User | undefined>) {
      state.user = payload;
    },
  },
  initialState,
});

export const { reducer: userReducer, actions: userActions } = userSlice;
