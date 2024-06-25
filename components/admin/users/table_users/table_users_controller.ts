import { UserModel } from "@/models/user";
import { getAllUsers } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

interface onGetUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
}
export async function onGetUsers({ setUsers }: onGetUsersProps) {
  try {
    const users = await getAllUsers();
    setUsers(sortPresencesUsers({ users, action: "desc" }));
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
  const usersFiltered = users.filter((user) => user.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()));
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

export function sortPresencesUsers({
  users,
  action,
}: sortDateUsersProps): UserModel[] {
  if (action === "asc") {
    return users.sort((a, b) => a.totalPresence - b.totalPresence);
  } else {
    return users.sort((a, b) => b.totalPresence - a.totalPresence);
  }
}
