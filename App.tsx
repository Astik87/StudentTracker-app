import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';

import RootNavigator from '@/components/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
