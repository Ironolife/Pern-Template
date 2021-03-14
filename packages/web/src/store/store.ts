import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './reducers/user.reducer';

const store = configureStore({
  reducer: {
    user,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
