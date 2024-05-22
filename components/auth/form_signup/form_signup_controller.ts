import { UserContext } from "@/context/userContext";
import { createAuthUser } from "@/repositories/userAuth";
import { createUserFireStore, getUser } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/formatterError";
import { UserCredential } from "firebase/auth";
import { FormEvent, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IPropsOnCreateUser {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  router: AppRouterInstance;
}

export async function onCreateUser({
  e,
  setIsLoading,
  setUser,
  router,
}: IPropsOnCreateUser): Promise<UserCredential | null> {
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
      const user = await getUser(userCredential.user.uid);
      setUser(user);
      router.push("/home");
      toast.success("Usuário criado com sucesso");
      return userCredential;
    } catch (error) {
      console.log(error);
      formatterError(error);
    }
  }
  setIsLoading(false);
  return null;
}

function formatDataUser(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  var dataUser: IDataAuthUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    madeCane: (formData.get("madeCane") as string) == "true" ? true : false,
  };
  if (parseInt(formData.get("madeCaneDate") as string) as number) {
    dataUser = {
      ...dataUser,
      madeCaneDate: parseInt(formData.get("madeCaneDate") as string) as number,
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
