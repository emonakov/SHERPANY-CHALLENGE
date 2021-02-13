import { FC } from 'react';
import styled from 'styled-components';
import { Box, Text, Button, Avatar, Card } from 'grommet';

import { useModal } from '../hooks/useUserModal';
import { UserDocInterface } from '../StateInterface';

const ColoredText = styled(Text)`
  color: #746a32;
  font-size: 0.9rem;
`;

const UserCard: FC<{ user: UserDocInterface }> = ({ user }) => {
  const { openModal, setUser } = useModal();

  return (
    <Box
      pad="large"
      align="center"
      background={{ color: 'light-2', opacity: 'strong' }}
      round
      gap="small"
    >
      <Avatar src={user.pictureSmall} />
      <Text a11yTitle="full user name">{user.name}</Text>
      <Card
        background={{ color: 'light-3' }}
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="center"
      >
        <ColoredText a11yTitle="login">{user.login}</ColoredText>
        <ColoredText a11yTitle="email">{user.email}</ColoredText>
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
