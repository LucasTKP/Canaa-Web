import { Dispatch, SetStateAction, createContext } from "react";

export const UserContext = createContext<{
  user: undefined;
  setUser: Dispatch<SetStateAction<undefined>>;
}>({ user: undefined, setUser: (user) => {} });
