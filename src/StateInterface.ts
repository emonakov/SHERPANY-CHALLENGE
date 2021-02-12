export interface UsersQueryResult {
  results: UserInterface[];
  info: {
    results: number;
    page: number;
  };
}

export interface UserInterface {
  gender: string;
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
  dob: {
    date: string;
    age: number;
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
  usersList: UsersQueryResult[];
  usersSearch: UsersQueryResult[];
  nat?: string;
}
