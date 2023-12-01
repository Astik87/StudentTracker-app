import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserDataInSecureStore } from '../../lib/setUserDataInSecureStore.ts';
import { userActions } from '../slice/userSlice.ts';
import { UserDataInSecureStore } from '../types/UserDataInSecureStore.ts';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const setUserDataThunk = createAsyncThunk<
  void,
  UserDataInSecureStore,
  ThunkConfig<string>
>('user/setRefreshToken', async (userData, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const result = await setUserDataInSecureStore(userData);
    if (!result) {
      return rejectWithValue(
        'Не удалось сохранить данные авторизации на устройстве',
      );
    }

    dispatch(userActions.setRefreshToken(userData.refreshToken));
    dispatch(userActions.setUser(userData.user));
    dispatch(userActions.setIsAuth(true));
  } catch (error) {
    return rejectWithValue('Непредвиденная ошибка');
  }
});
