import React, { FC } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import UserList from './components/UserList';
import UserModal from './components/UserModal';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import UserModalProvider from './hooks/useUserModal';
import { store } from './store';

import Search from './components/Search';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Grommet full theme={grommet} background="dark-1">
          <BrowserRouter>
            <Navigation>
              <Route path="/" exact>
                <Search />
              </Route>
            </Navigation>
            <Switch>
              <Route path="/" exact>
                <UserModalProvider>
                  <UserList />
                  <UserModal />
                </UserModalProvider>
              </Route>
              <Route path="/settings" exact>
                <Settings />
              </Route>
            </Switch>
          </BrowserRouter>
        </Grommet>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
