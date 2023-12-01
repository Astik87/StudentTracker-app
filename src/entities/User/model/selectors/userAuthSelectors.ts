import { createSelector } from '@reduxjs/toolkit';

import { userRootSelector } from './userRootSelector.ts';

export const userIsAuthSelector = createSelector(
  userRootSelector,
  ({ isAuth }) => isAuth,
);
