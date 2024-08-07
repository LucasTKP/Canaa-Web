import { createAuthUser } from "@/repositories/userAuth";
import { createUserFireStore, getUser } from "@/repositories/userFireStore";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { IDataAuthUser } from "@/models/user";
import { formatterError } from "@/utils/functions/formatter_error";

interface IPropsOnCreateUser {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function onCreateUser({ e, setIsLoading }: IPropsOnCreateUser) {
  e.preventDefault();
  setIsLoading(true);

  const dataAuthUser = formatDataUser(e);
  if (verifyDataUser(dataAuthUser) && verifyPassword(dataAuthUser)) {
    try {
      const userCredential = await createAuthUser({
        email: dataAuthUser.email,
        password: dataAuthUser.password,
      });
      createUserFireStore({
        dataAuthUser,
        idAuthUser: userCredential.user.uid,
      });
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      console.log(error);
      formatterError(error);
    }
  }
  setIsLoading(false);
}

function formatDataUser(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  var dataUser: IDataAuthUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    madeCane: (formData.get("madeCane") as string) == "true" ? true : false,
    madeCaneYear: null,
    namePhoto: "jesus.jpg",
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/canaa-afb9f.appspot.com/o/imageProfile%2Fjesus.jpg?alt=media&token=2c88b915-676a-46d4-8b5a-887c11ea714c",
  };
  if (parseInt(formData.get("madeCaneYear") as string) as number) {
    dataUser = {
      ...dataUser,
      madeCaneYear: parseInt(formData.get("madeCaneYear") as string) as number,
    };
  }

  return dataUser;
}

function verifyDataUser(dataAuthUser: IDataAuthUser): boolean {
  if (
    dataAuthUser.name.length >= 4 &&
    dataAuthUser.email.length > 10 &&
    dataAuthUser.password.length >= 6 &&
    dataAuthUser.confirmPassword.length >= 6
  ) {
    if (dataAuthUser.madeCane && dataAuthUser.madeCaneYear) return true;
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
