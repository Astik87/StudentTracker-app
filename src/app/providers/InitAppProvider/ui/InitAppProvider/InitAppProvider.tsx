import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import {
  getUserDataInSecureStore,
  setUserDataThunk,
  userActions,
  userIsAuthSelector,
} from '@/entities/User';
import {
  StyleGeneratorProps,
  useStyles,
} from '@/shared/libs/hooks/useStyles.ts';
import { AuthByLoginForm } from '@/features/AuthByLogin';
import { initAuthHost } from '@/shared/api/authHost.ts';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch.ts';
import {
  OnRefreshToken,
  OnRefreshTokenError,
} from '@/shared/api/types/RefreshTokenCallbacks.ts';
import { logoutThunk } from '@/features/Logout';

const InitAppProvider: FC<
  PropsWithChildren<{ reduxStore: ToolkitStore<StateSchema> }>
> = ({ children, reduxStore }) => {
  const styles = useStyles(stylesGenerator);

  const dispatch = useAppDispatch();
  const userIsAuth = useSelector(userIsAuthSelector);

  const [appIsInit, setAppIsInit] = useState<boolean>(false);

  const onRefreshToken: OnRefreshToken = useCallback(
    async (accessToken, refreshToken) => {
      const userDataInStorage = await getUserDataInSecureStore();
      dispatch(userActions.setAccessToken(accessToken));
      if (userDataInStorage) {
        dispatch(setUserDataThunk({ ...userDataInStorage, refreshToken }));
      }
    },
    [dispatch],
  );

  const onRefreshTokenError: OnRefreshTokenError = useCallback(() => {
    dispatch(logoutThunk());
    Alert.alert('Ошибка авторизации');
  }, [dispatch]);

  const initApp = useCallback(async () => {
    initAuthHost(reduxStore, onRefreshToken, onRefreshTokenError);

    const userDataInStorage = await getUserDataInSecureStore();

    if (userDataInStorage) {
      dispatch(userActions.setUser(userDataInStorage.user));
      dispatch(userActions.setRefreshToken(userDataInStorage.refreshToken));
      dispatch(userActions.setIsAuth(true));
    }

    setAppIsInit(true);
  }, [dispatch, onRefreshToken, onRefreshTokenError, reduxStore]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  if (!appIsInit) {
    return (
      <SafeAreaView style={styles.main}>
        <ActivityIndicator animating={true} size={'large'} />
      </SafeAreaView>
    );
  }

  if (!userIsAuth) {
    return (
      <SafeAreaView style={[styles.main]}>
        <KeyboardAvoidingView
          behavior={'height'}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={[styles.main, styles.center]}>
            <AuthByLoginForm />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return children;
};

const stylesGenerator = ({ theme }: StyleGeneratorProps) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default InitAppProvider;
