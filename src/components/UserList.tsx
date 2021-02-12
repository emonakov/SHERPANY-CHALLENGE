import { FC, useContext } from 'react';
import styled from 'styled-components';
import { Box, Grid, ResponsiveContext } from 'grommet';

import UserCard from './UserCard';
import { useUsersQuery } from '../hooks/useUsersQuery';

const BoxRelative = styled(Box)`
  position: relative;
`;

const UserList: FC = () => {
  const { data, Interceptor } = useUsersQuery();
  const size = useContext(ResponsiveContext);

  return data ? (
    <BoxRelative
      direction="column"
      justify="center"
      pad="large"
      background="dark-1"
      gap="medium"
    >
      <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="large">
        {data.map((page) =>
          page.results.map((user) => (
            <UserCard key={user.id.value} user={user} />
          )),
        )}
      </Grid>
      {Interceptor}
    </BoxRelative>
  ) : null;
};

export default UserList;
