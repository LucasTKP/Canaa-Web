import { UserModel } from "@/models/user";
import { formatterError } from "@/utils/functions/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { getUser, updateUser } from "@/repositories/userFireStore";

interface OnEditUser {
  e: FormEvent<HTMLFormElement>;
  user: UserModel;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
  closeDialog: () => void;
}

export async function onEditUser({
  e,
  user,
  setIsLoading,
  setUser,
  closeDialog,
}: OnEditUser) {
  e.preventDefault();
  setIsLoading(true);
  try {
    const dataUser = await formatterDataUser({ user, e });
    if (verifyDataUser(dataUser)) {
      await updateUser(dataUser);
      toast.success("Usuário editado com sucesso.");
      const newUser = await getUser(user.id);
      if (newUser) setUser(newUser);
    }
  } catch (error) {
    console.log(error);
    formatterError(error);
  } finally {
    setIsLoading(false);
    closeDialog();
  }
}

interface formatterDataUserProps {
  user: UserModel;
  e: FormEvent<HTMLFormElement>;
}

async function formatterDataUser({
  user,
  e,
}: formatterDataUserProps): Promise<UserModel> {
  const formData = new FormData(e.currentTarget);

  const madeCaneYear =
    (formData.get("madeCaneYear") as string) != null
      ? parseInt(formData.get("madeCaneYear") as string)
      : null;

  var dataUser: UserModel = {
    id: user.id,
    name: formData.get("name") as string,
    email: user.email,
    madeCane: (formData.get("madeCane") as string) == "true" ? true : false,
    lastPresence: user.lastPresence,
    totalPresence: user.totalPresence,
    namePhoto: user.namePhoto,
    photoUrl: user.photoUrl,
    madeCaneYear: madeCaneYear,
  };

  return dataUser;
}

function verifyDataUser(dataUser: UserModel): boolean {
  if (
    dataUser.id &&
    dataUser.name &&
    dataUser.email &&
    dataUser.madeCane != null &&
    dataUser.lastPresence != null &&
    dataUser.totalPresence != null &&
    dataUser.namePhoto &&
    dataUser.photoUrl
  ) {
    return true;
  }
  toast.error("Dados insuficientes");
  return false;
}
