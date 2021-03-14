import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFragment } from '../../generated/graphql';

type UserSliceState = UserFragment | null;

const userSlice = createSlice({
  name: 'userSlice',
  initialState: null as UserSliceState,
  reducers: {
    setUser: (_, { payload: user }: PayloadAction<UserFragment>) => user,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
