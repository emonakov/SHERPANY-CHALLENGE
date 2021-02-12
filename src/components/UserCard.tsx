import { FC } from 'react';
import styled from 'styled-components';
import { Box, Text, Button, Avatar, Card } from 'grommet';

import { useModal } from '../hooks/useUserModal';
import { UserInterface } from '../StateInterface';

const ColoredText = styled(Text)`
  color: #746a32;
  font-size: 0.9rem;
`;

const UserCard: FC<{ user: UserInterface }> = ({ user }) => {
  const { openModal, setUser } = useModal();

  return (
    <Box
      pad="large"
      align="center"
      background={{ color: 'light-2', opacity: 'strong' }}
      round
      gap="small"
    >
      <Avatar src={user.picture.thumbnail} />
      <Text>
        {user.name.title} {user.name.first} {user.name.last}
      </Text>
      <Card
        background={{ color: 'light-3' }}
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="center"
      >
        <ColoredText>{user.login.username}</ColoredText>
        <ColoredText>{user.email}</ColoredText>
      </Card>
      <Button
        label="Open"
        onClick={() => {
          setUser(user);
          openModal();
        }}
      />
    </Box>
  );
};

export default UserCard;
