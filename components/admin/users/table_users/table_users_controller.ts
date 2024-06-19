import { UserModel } from "@/models/user";
import { getAllUsers } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

interface onGetUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
}
export async function onGetUsers({ setUsers }: onGetUsersProps) {
  try {
    const users = await getAllUsers();
    setUsers(users);
  } catch (error) {
    console.log(error);
    formatterError(error);
  }
}

interface FilterUsersProps {
  users: UserModel[];
  textSearch: string;
}

export function filterUsers({
  users,
  textSearch,
}: FilterUsersProps): UserModel[] {
  const usersFiltered = users.filter((user) => user.name.includes(textSearch));
  return usersFiltered;
}
interface sortDateUsersProps {
  users: UserModel[];
  action: "asc" | "desc";
}

export function sortLastPresenceUsers({
  users,
  action,
}: sortDateUsersProps): UserModel[] {
  if (action === "asc") {
    return users.sort(
      (a, b) => a.lastPresence.getTime() - b.lastPresence.getTime()
    );
  } else {
    return users.sort(
      (a, b) => b.lastPresence.getTime() - a.lastPresence.getTime()
    );
  }
}
