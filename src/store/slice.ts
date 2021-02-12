import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfiniteData } from 'react-query';

import { StateInterface, UsersQueryResult } from '../StateInterface';
import { getDefaultNat } from '../helpers/settings';
import { RootState } from './store';

const initialState: StateInterface = {
  usersList: [],
  usersSearch: [],
  nat: getDefaultNat(),
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersToList: (
      state: StateInterface,
      action: PayloadAction<InfiniteData<UsersQueryResult>>,
    ) => {
      state.usersList = action.payload.pages;
    },
    searchUsers: (
      state: StateInterface,
      action: PayloadAction<{ term: string }>,
    ) => {
      state.usersSearch = state.usersList.map((page) => {
        return {
          ...page,
          results: page.results.filter((user) => {
            return `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`.startsWith(
              action.payload.term.toLowerCase(),
            );
          }),
        };
      });
    },
    clearSearch: (state: StateInterface) => {
      state.usersSearch = [];
    },
    clearUsers: (state: StateInterface) => {
      state.usersList = [];
    },
    setNat: (state: StateInterface, action: PayloadAction<string>) => {
      state.nat = action.payload;
      localStorage.setItem('nat', action.payload);
    },
  },
});

export const {
  addUsersToList,
  searchUsers,
  clearSearch,
  clearUsers,
  setNat,
} = slice.actions;

export const selectUsers = (state: RootState): UsersQueryResult[] =>
  state.users.usersList;
export const selectSearchedUsers = (state: RootState): UsersQueryResult[] =>
  state.users.usersSearch;
export const selectNat = (state: RootState): string =>
  state.users.nat as string;

export default slice.reducer;
