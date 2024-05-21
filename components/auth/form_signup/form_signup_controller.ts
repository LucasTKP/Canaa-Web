import { createAuthUser } from "@/repositories/userAuth";
import { formatterError } from "@/utils/formatterError";
import { UserCredential } from "firebase/auth";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface IPropsOnCreateUser {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDataAuthUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  madeCane: boolean;
  madeCaneDate: number | null;
}

export async function onCreateUser({
  e,
  setIsLoading,
}: IPropsOnCreateUser): Promise<UserCredential | null> {
  e.preventDefault();
  setIsLoading(true);
  const dataAuthUser = formatDataUser(e);
  if (verifyDataUser(dataAuthUser) && verifyPassword(dataAuthUser)) {
    try {
      const result = await createAuthUser({
        email: dataAuthUser.email,
        password: dataAuthUser.password,
      });
      setIsLoading(false);
      toast.success("Usuário criado com sucesso");
      return result;
    } catch (error) {
      formatterError(error);
    }
  }
  setIsLoading(false);
  return null;
}

function formatDataUser(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const madeCane =
    (formData.get("madeCane") as string) == "true" ? true : false;

  const madeCaneDate = madeCane
    ? (parseInt(formData.get("madeCaneDate") as string) as number)
    : null;

  return {
    name,
    email,
    password,
    confirmPassword,
    madeCane,
    madeCaneDate,
  };
}

function verifyDataUser(dataAuthUser: IDataAuthUser): boolean {
  if (
    dataAuthUser.name.length >= 4 &&
    dataAuthUser.email.length > 10 &&
    dataAuthUser.password.length >= 6 &&
    dataAuthUser.confirmPassword.length >= 6
  ) {
    if (dataAuthUser.madeCane && dataAuthUser.madeCaneDate) return true;
    if (!dataAuthUser.madeCane) return true;
  }
  toast.error("Faltou informação para efetuar seu cadastro!");
  return false;
}

function verifyPassword(dataAuthUser: IDataAuthUser): boolean {
  if (dataAuthUser.password === dataAuthUser.confirmPassword) return true;
  toast.error("As senhas não estão iguais!");
  return false;
}
