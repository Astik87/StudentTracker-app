import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { UserDataInSecureStore } from '../model/types/UserDataInSecureStore.ts';
import { UserDataInSecureStoreKeys } from '../config/UserDataInSecureStoreKeys.ts';

export const setUserDataInSecureStore = async (
  userData: UserDataInSecureStore,
): Promise<boolean> => {
  try {
    const userDataJson = JSON.stringify(userData);

    if (Platform.OS === 'web') {
      localStorage.setItem(UserDataInSecureStoreKeys.USER_DATA, userDataJson);
    } else {
      await SecureStore.setItemAsync(
        UserDataInSecureStoreKeys.USER_DATA,
        userDataJson,
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
