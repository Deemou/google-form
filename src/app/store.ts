import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import infoSlice from './slices/infoSlice';
import contentSlice from './slices/contentSlice';

export const store = configureStore({
  reducer: { infoSlice, contentSlice }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
