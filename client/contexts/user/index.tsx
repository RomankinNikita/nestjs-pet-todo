import { noop } from 'lodash';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { UserMapped } from '../../utils/types';

type UserContextValue = [
  UserMapped | null,
  Dispatch<SetStateAction<UserMapped | null>>,
];
type UserContextProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextValue>([null, noop]);

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserMapped | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserContextValue => {
  const useContextValue = useContext(UserContext);
  return useContextValue;
};

export { UserContextProvider, useUserContext };
