import { FC } from 'react';
import styled from 'styled-components';
import { grommet, Box, Grommet } from 'grommet';
import { ReactQueryDevtools } from 'react-query/devtools';

import { UserInterface } from './StateInterface';
import { useUsersQuery } from './hooks/useUsersQuery';

const BoxRelative = styled(Box)`
  position: relative;
`;

const App: FC = () => {
  const { data, Interceptor } = useUsersQuery({ nat: 'ES' });

  return (
    <Grommet full theme={grommet}>
      <BoxRelative
        direction="column"
        justify="center"
        pad="xlarge"
        background="dark-1"
        gap="medium"
      >
        {data &&
          data.map((page) =>
            page.results.map((user: UserInterface) => (
              <h4 key={user.id.value}>{user.email}</h4>
            )),
          )}
        {Interceptor}
      </BoxRelative>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </Grommet>
  );
};

export default App;
