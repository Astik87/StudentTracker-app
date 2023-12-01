import { FC, useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { authByLoginRequest } from '../../api/authByLoginRequest.ts';

import {
  StyleGeneratorProps,
  useStyles,
} from '@/shared/libs/hooks/useStyles.ts';
import { setUserDataThunk, userActions } from '@/entities/User';
import { getResponseErrorMessage } from '@/shared/api/getResponseErrorMessage.ts';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch.ts';
import delay from '@/shared/libs/time';

const AuthByLoginForm: FC = () => {
  const styles = useStyles(stylesGenerator);

  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const authByLogin = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    try {
      const authByLoginResponseData = await authByLoginRequest(login, password);

      const result = await dispatch(
        setUserDataThunk({
          refreshToken: authByLoginResponseData.refreshToken,
          user: authByLoginResponseData.user,
        }),
      );

      if (result.meta.requestStatus === 'rejected' && result.payload) {
        Alert.alert('Ошибка авторизации', result.payload);
      }
    } catch (requestError) {
      setError(getResponseErrorMessage(requestError));
    }

    setLoading(false);
  }, [dispatch, login, password]);

  return (
    <View style={styles.main}>
      <Text variant={'titleLarge'} style={styles.title}>
        Auth
      </Text>
      <TextInput
        style={styles.input}
        label={'Login'}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        label={'Password'}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        style={styles.button}
        mode={'contained'}
        onPress={authByLogin}
        loading={loading}
      >
        Login
      </Button>
    </View>
  );
};

const stylesGenerator = ({ theme }: StyleGeneratorProps) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 30,
      width: '90%',
      height: '90%',
      maxWidth: 400,
      minWidth: 350,
      maxHeight: 350,
      backgroundColor: theme.colors.onSecondary,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },

    input: {
      marginTop: 10,
    },

    errorText: {
      marginTop: 10,
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.error,
    },

    button: {
      marginTop: 15,
    },
  });
};

export default AuthByLoginForm;
