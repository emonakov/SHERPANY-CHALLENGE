import { FC, useEffect } from 'react';
import ModalUnstyled from 'react-modal';
import styled from 'styled-components';
import {
  Box,
  Text,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Anchor,
} from 'grommet';

import { useUserModalContext } from '../hooks/useUserModal';

ModalUnstyled.setAppElement('#root');

const Modal = styled(ModalUnstyled)`
  outline: none;
  position: relative;
  display: inline-block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CloseModalIcon = styled(Anchor)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const UserModal: FC = () => {
  const {
    userState: [user, setUser],
    modalState: [isOpen, setIsOpen],
  } = useUserModalContext();

  useEffect(() => {
    return () => {
      setUser(undefined);
    };
  }, [setUser]);

  return user ? (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={user?.name.first}
    >
      <Card
        align="center"
        background={{ color: 'dark-1' }}
        round
        width="medium"
      >
        <CardHeader background="#000000A0" pad="small" width="medium">
          <Heading a11yTitle="full name" level="3" margin="small">
            {user.name.title} {user.name.first} {user.name.last}
            <CloseModalIcon
              label="⤫"
              onClick={() => setIsOpen(false)}
              size="xsmall"
            />
          </Heading>
        </CardHeader>
        <CardBody a11yTitle="User's full address">
          <Box
            direction="row-responsive"
            justify="center"
            align="center"
            pad="medium"
            width="medium"
            height="fill"
            background="dark-2"
            gap="small"
          >
            <Box>
              <Avatar src={user.picture.large} size="xlarge" />
            </Box>
            <Box>
              <Text>
                {user.location.street.name} {user.location.street.number}
              </Text>
              <Text>{user.location.city}</Text>
              <Text>{user.location.state}</Text>
              <Text>{user.location.postcode}</Text>
              <Text>{user.location.country}</Text>
            </Box>
          </Box>
        </CardBody>
        <CardFooter
          background="#000000A0"
          width="medium"
          justify="start"
          pad="small"
        >
          <Text a11yTitle="User's phone number">☎ {user.phone}</Text>
        </CardFooter>
      </Card>
    </Modal>
  ) : null;
};

export default UserModal;
