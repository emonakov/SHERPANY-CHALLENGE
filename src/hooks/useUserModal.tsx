import {
  FC,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

import { UserDocInterface } from '../StateInterface';
import dummyState from '../helpers/dummy';

interface ModalContextInterface {
  userState: [
    UserDocInterface | undefined,
    Dispatch<SetStateAction<UserDocInterface | undefined>>,
  ];
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const ModalContext = createContext<ModalContextInterface>({
  userState: [undefined, dummyState],
  modalState: [false, dummyState],
});

const UserModalProvider: FC = ({ children }) => {
  const userState = useState<UserDocInterface>();
  const modalState = useState(false);

  return (
    <ModalContext.Provider
      value={{
        userState,
        modalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useUserModalContext = (): ModalContextInterface =>
  useContext(ModalContext);

const useModal = (): {
  openModal: () => void;
  setUser: (user: UserDocInterface) => void;
} => {
  const {
    userState: [, setUser],
    modalState: [, setIsModalOpen],
  } = useUserModalContext();

  return {
    openModal: () => setIsModalOpen(true),
    setUser,
  };
};

export { useUserModalContext, useModal };

export default UserModalProvider;
