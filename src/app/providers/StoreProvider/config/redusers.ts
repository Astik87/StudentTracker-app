import { combineReducers } from 'redux';

import { userReducer } from '@/entities/User';

export const rootReducer = combineReducers({ user: userReducer });
