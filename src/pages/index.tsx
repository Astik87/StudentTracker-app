import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { Stack } from 'expo-router';

const App = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Home' }} />
      <Text>Hello Alim</Text>
    </View>
  );
};

export default App;
