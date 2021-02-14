export interface UsersQueryResult {
  results: UserInterface[];
  info: {
    results: number;
    page: number;
  };
}

export interface UserDocInterface {
  id: string;
  address: string;
  city: string;
  state: string;
  postcode: number;
  phone: string;
  email: string;
  login: string;
  name: string;
  pictureSmall: string;
  pictureLarge: string;
  nat: string;
  country: string;
}

export interface UserInterface {
  id: {
    name: string;
    value: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
  };
  email: string;
  login: {
    username: string;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface StateInterface {
  usersList: UserDocInterface[];
  usersSearch: UserDocInterface[];
  nat?: string;
  searchTerm?: string;
  page: number;
  usersNextBatch?: UsersQueryResult;
}
