import { FC } from 'react';
import { grommet, Grommet } from 'grommet';
import { ReactQueryDevtools } from 'react-query/devtools';

import UserList from './components/UserList';

const App: FC = () => {
  return (
    <Grommet full theme={grommet}>
      <UserList />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </Grommet>
  );
};

export default App;
