import { combineReducers } from '@reduxjs/toolkit';
import navReducer from './nav/nav.slice';

export const rootReducer = combineReducers({
  nav: navReducer,
});
