import { UserModel } from "@/models/user";
import { Dispatch, SetStateAction, createContext } from "react";

export const UserContext = createContext<{
  user: UserModel | undefined;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
}>(null!);
