import React, { FC } from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

import { HeaderProps } from '../../types/HeaderProps';

import { UserAvatar } from '@/entities/User';

const Header: FC<HeaderProps> = ({ headerBackVisible, title }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const canGoBack = navigation.canGoBack();

  return (
    <Appbar.Header>
      {headerBackVisible && canGoBack ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <DrawerToggleButton tintColor={theme.colors.onBackground} />
      )}
      <Appbar.Content title={title} />
      <UserAvatar />
    </Appbar.Header>
  );
};

export default Header;
