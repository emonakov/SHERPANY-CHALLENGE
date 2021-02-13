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
      tag="article"
      a11yTitle="A user card"
    >
      <Avatar src={user.pictureSmall} />
      <Text>{user.name}</Text>
      <Card
        background={{ color: 'light-3' }}
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="center"
      >
        <ColoredText>{user.login}</ColoredText>
        <ColoredText>{user.email}</ColoredText>
      </Card>
      <Button
        a11yTitle={`Open address data for ${user.name}`}
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
