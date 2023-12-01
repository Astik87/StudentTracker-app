import { createSelector } from '@reduxjs/toolkit';

import { userRootSelector } from './userRootSelector.ts';

export const userSelector = createSelector(
  userRootSelector,
  ({ user }) => user,
);
