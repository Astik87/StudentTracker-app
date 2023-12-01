import { StateSchema } from '@/app/providers/StoreProvider';

export const userRootSelector = (state: StateSchema) => state.user;
