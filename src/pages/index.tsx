import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useCallback, useState } from 'react';

import { authHost } from '@/shared/api/authHost.ts';

const HomeScreen = () => {
  const [result, setResult] = useState<string>();

  const sendRequest = useCallback(async () => {
    try {
      await authHost.get('/courses', {
        params: { limit: 10, page: 1 },
        withCredentials: true,
      });
      setResult('Да');
    } catch (error) {
      console.error(error);
      setResult('Нет');
    }
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: 'Home' }} />
      <Button onPress={sendRequest}>Send {result}</Button>
    </View>
  );
};

export default HomeScreen;
