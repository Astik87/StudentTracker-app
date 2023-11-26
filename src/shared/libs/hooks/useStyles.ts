import { ScaledSize, StyleSheet, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

export const useStyles = <T extends ReturnType<typeof StyleSheet.create>>(
  styleCreator: (windowDimensions: ScaledSize) => T,
): T => {
  const windowDimensions = useWindowDimensions();

  return useMemo(
    () => styleCreator(windowDimensions),
    [styleCreator, windowDimensions],
  );
};
