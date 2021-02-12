import { FC } from 'react';
import { grommet, Grommet } from 'grommet';
import { ReactQueryDevtools } from 'react-query/devtools';

import UserList from './components/UserList';
import UserModal from './components/UserModal';
import UserModalProvider from './hooks/useUserModal';

const App: FC = () => {
  return (
    <Grommet full theme={grommet}>
      <UserModalProvider>
        <UserList />
        <UserModal />
      </UserModalProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </Grommet>
  );
};

export default App;
