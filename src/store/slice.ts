import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfiniteData } from 'react-query';
import MiniSearch from 'minisearch';

import {
  StateInterface,
  UserDocInterface,
  UsersQueryResult,
} from '../StateInterface';
import { getDefaultNat } from '../helpers/settings';
import { RootState } from './store';

const miniSearch = new MiniSearch({
  fields: ['address', 'city', 'state', 'postcode', 'name'], // fields to index for full-text search
  storeFields: [
    'id',
    'address',
    'city',
    'state',
    'postcode',
    'phone',
    'email',
    'login',
    'name',
    'pictureSmall',
    'pictureLarge',
    'nat',
    'country',
  ], // fields to return with search results
});

const initialState: StateInterface = {
  usersList: [],
  usersSearch: [],
  nat: getDefaultNat(),
  page: 1,
};

const processUserData = (data: UsersQueryResult) =>
  data.results.map((user) => ({
    id: user.id.value,
    address: `${user.location.street.name} ${user.location.street.number}`,
    city: user.location.city,
    state: user.location.state,
    postcode: user.location.postcode,
    phone: user.phone,
    email: user.email,
    login: user.login.username,
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    pictureSmall: user.picture.thumbnail,
    pictureLarge: user.picture.large,
    nat: user.nat,
    country: user.location.country,
  }));

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersToList: (
      state: StateInterface,
      action: PayloadAction<InfiniteData<UsersQueryResult>>,
    ) => {
      miniSearch.removeAll();
      const users: UserDocInterface[] = action.payload.pages
        .map(processUserData)
        .flat();
      state.usersList = users;
      miniSearch.addAll(users);
    },
    addUsersFromBatch: (state: StateInterface) => {
      if (state.usersNextBatch) {
        const newUsers = processUserData(state.usersNextBatch);
        state.usersList = [...state.usersList, ...newUsers];
      }
      state.usersNextBatch = undefined;
    },
    addToBatch: (
      state: StateInterface,
      action: PayloadAction<InfiniteData<UsersQueryResult>>,
    ) => {
      state.usersNextBatch =
        action.payload.pages[action.payload.pages.length - 1];
    },
    usersSearch: (state: StateInterface, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.usersSearch = (miniSearch.search(action.payload, {
        fuzzy: 0.1,
      }) as unknown) as UserDocInterface[];
    },
    clearSearch: (state: StateInterface) => {
      state.usersSearch = [];
      state.searchTerm = undefined;
    },
    clearUsers: (state: StateInterface) => {
      state.usersList = [];
    },
    setNat: (state: StateInterface, action: PayloadAction<string>) => {
      state.nat = action.payload;
      localStorage.setItem('nat', action.payload);
    },
    setPage: (state: StateInterface, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  addUsersToList,
  clearUsers,
  setNat,
  clearSearch,
  usersSearch,
  setPage,
  addToBatch,
  addUsersFromBatch,
} = slice.actions;

export const selectUsers = (state: RootState): UserDocInterface[] =>
  state.users.usersList;
export const selectNat = (state: RootState): string =>
  state.users.nat as string;
export const selectSearchUsers = (state: RootState): UserDocInterface[] =>
  state.users.usersSearch;
export const selectSearchTerm = (state: RootState): string | undefined =>
  state.users.searchTerm;
export const selectPage = (state: RootState): number => state.users.page;

export default slice.reducer;
