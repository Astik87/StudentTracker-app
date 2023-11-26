import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './redusers.ts';
import { StateSchema } from './StateSchema.ts';

const createReduxStore = () => {
  return configureStore<StateSchema>({
    devTools: true,
    reducer: rootReducer,
  });
};

export const store = createReduxStore();

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
