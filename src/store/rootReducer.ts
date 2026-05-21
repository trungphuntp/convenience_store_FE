import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loadingSlice';
import authReducer from './slices/authSlice';

export const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
});
