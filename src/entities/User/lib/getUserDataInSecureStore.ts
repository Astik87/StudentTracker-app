import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { UserDataInSecureStore } from '../model/types/UserDataInSecureStore.ts';
import { UserDataInSecureStoreKeys } from '../config/UserDataInSecureStoreKeys.ts';

export const getUserDataInSecureStore =
  async (): Promise<UserDataInSecureStore | null> => {
    try {
      let userDataJson;
      if (Platform.OS === 'web') {
        userDataJson = localStorage.getItem(
          UserDataInSecureStoreKeys.USER_DATA,
        );
      } else {
        userDataJson = await SecureStore.getItemAsync(
          UserDataInSecureStoreKeys.USER_DATA,
        );
      }

      if (!userDataJson) {
        return null;
      }

      return JSON.parse(userDataJson) as UserDataInSecureStore;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
