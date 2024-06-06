/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserProfile = any;

interface UserInitialState {
  user: UserProfile | null;
}

const initialState: UserInitialState = { user: null };

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser, updateEmail } = actions;
export default reducer;

export const userSelector = (state: RootState) => state.userData;
