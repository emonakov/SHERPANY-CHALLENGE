import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateInterface, UserInterface } from '../StateInterface';

import { /* AppThunk, */ RootState } from './store';

const initialState: StateInterface = {
  usersList: [],
  usersSearch: [],
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersToList: (
      state: StateInterface,
      action: PayloadAction<StateInterface>,
    ) => {
      state.usersList = [...state.usersList, ...action.payload.usersList];
    },
    searchUsers: (
      state: StateInterface,
      action: PayloadAction<{ term: string }>,
    ) => {
      state.usersSearch = state.usersList.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .startsWith(action.payload.term.toLowerCase()),
      );
    },
    clearSearch: (state: StateInterface) => {
      state.usersSearch = [];
    },
    clearUsers: (state: StateInterface) => {
      state.usersList = [];
    },
  },
});

export const {
  addUsersToList,
  searchUsers,
  clearSearch,
  clearUsers,
} = slice.actions;

export const selectUsers = (state: RootState): UserInterface[] =>
  state.users.usersList;
export const selectSearchedUsers = (state: RootState): UserInterface[] =>
  state.users.usersSearch;

export default slice.reducer;
