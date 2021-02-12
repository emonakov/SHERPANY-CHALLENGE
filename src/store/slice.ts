import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfiniteData } from 'react-query';

import { StateInterface, UsersQueryResult } from '../StateInterface';

import { RootState } from './store';

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
  },
});

export const {
  addUsersToList,
  searchUsers,
  clearSearch,
  clearUsers,
} = slice.actions;

export const selectUsers = (state: RootState): UsersQueryResult[] =>
  state.users.usersList;
export const selectSearchedUsers = (state: RootState): UsersQueryResult[] =>
  state.users.usersSearch;

export default slice.reducer;
