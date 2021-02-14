import React, { FC } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import UserList from './components/UserList';
import UserModal from './components/UserModal';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import UserModalProvider from './hooks/useUserModal';

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
    <QueryClientProvider client={queryClient}>
      <Grommet full theme={grommet} background="dark-1">
        <UserModalProvider>
          <Router>
            <Navigation>
              <Route path="/" exact>
                <Search />
              </Route>
            </Navigation>
            <Switch>
              <Route path="/" exact>
                <UserList />
              </Route>
              <Route path="/settings" exact>
                <Settings />
              </Route>
            </Switch>
          </Router>
          <UserModal />
        </UserModalProvider>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen />
        )}
      </Grommet>
    </QueryClientProvider>
  );
};

export default App;
