import React, { FC, useCallback } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

import { logoutThunk } from '../../model/services/logoutThunk.ts';

import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch.ts';

const LogoutButton: FC<ButtonProps> = (buttonProps) => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return <Button {...buttonProps} onPress={logout} />;
};

export default LogoutButton;
