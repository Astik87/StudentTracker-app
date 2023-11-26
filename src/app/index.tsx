import { useColorScheme } from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
} from 'react-native-paper';
import { Drawer } from 'expo-router/drawer';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';

import { StoreProvider } from './providers/StoreProvider';

import { Header } from '@/widgets/Header';

const darkTheme: MD3Theme = MD3DarkTheme;

const lightTheme: MD3Theme = MD3LightTheme;

const navigationThemes = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  materialLight: MD3LightTheme,
  reactNavigationDark: DefaultTheme,
  materialDark: {
    ...MD3DarkTheme,
    colors: { ...MD3DarkTheme.colors, background: '#2a2a21' },
  },
});

const App = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme: MD3Theme = isDark ? darkTheme : lightTheme;
  const navigationTheme = isDark
    ? navigationThemes.DarkTheme
    : navigationThemes.LightTheme;

  return (
    <PaperProvider theme={theme}>
      <StoreProvider>
        <ThemeProvider value={navigationTheme}>
          <Drawer
            screenOptions={{
              header: ({ options, route }) => (
                <Header
                  headerBackVisible={false}
                  title={options.title ?? route.name}
                />
              ),
            }}
          />
        </ThemeProvider>
      </StoreProvider>
    </PaperProvider>
  );
};

export default App;
