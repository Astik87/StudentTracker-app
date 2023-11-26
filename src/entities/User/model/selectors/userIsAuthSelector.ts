import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

const rootSelector = (state: StateSchema) => state.user;

export const userIsAuthSelector = createSelector(
  rootSelector,
  ({ isAuth }) => isAuth,
);
