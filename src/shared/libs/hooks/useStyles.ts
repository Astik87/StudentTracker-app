import { ScaledSize, StyleSheet, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';

export type StyleGeneratorProps = ScaledSize & { theme: MD3Theme };

export const useStyles = <T extends ReturnType<typeof StyleSheet.create>>(
  styleCreator: (windowDimensions: StyleGeneratorProps) => T,
): T => {
  const windowDimensions = useWindowDimensions();
  const theme = useTheme();

  return useMemo(
    () => styleCreator({ ...windowDimensions, theme }),
    [styleCreator, theme, windowDimensions],
  );
};
