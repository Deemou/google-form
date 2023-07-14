import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import titleSlice from './slices/titleSlice';
import contentSlice from './slices/contentSlice';

export const store = configureStore({
  reducer: { titleSlice, contentSlice }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
