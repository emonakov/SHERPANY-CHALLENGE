import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Button, Grid, ResponsiveContext } from 'grommet';

import UserCard from './UserCard';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { selectSearchTerm, selectSearchUsers } from '../store';

const BoxRelative = styled(Box)`
  position: relative;
`;

const UserList: FC = () => {
  const { data, Interceptor } = useUsersQuery();
  const searchUsers = useSelector(selectSearchUsers);
  const searchTerm = useSelector(selectSearchTerm);

  const size = useContext(ResponsiveContext);

  return data ? (
    <BoxRelative
      direction="column"
      justify="center"
      pad="large"
      background="dark-1"
      gap="medium"
      tag="main"
      a11yTitle="Infinite list of users"
    >
      <Grid
        tag="section"
        columns={size !== 'small' ? 'medium' : '100%'}
        gap="large"
      >
        {searchTerm && (
          <>
            {searchUsers.length > 0 ? (
              searchUsers.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <Button disabled>Nothing found</Button>
            )}
          </>
        )}
        {!searchTerm &&
          data &&
          data.map((user) => <UserCard key={user.id} user={user} />)}
      </Grid>
      {!searchTerm && data && <Interceptor />}
    </BoxRelative>
  ) : null;
};

export default UserList;
