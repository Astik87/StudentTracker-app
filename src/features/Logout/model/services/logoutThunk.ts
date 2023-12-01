import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions } from '@/entities/User';

export const logoutThunk = createAsyncThunk('user/logout', (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;

  dispatch(userActions.setAccessToken(undefined));
  dispatch(userActions.setRefreshToken(undefined));
  dispatch(userActions.setIsAuth(false));
});
