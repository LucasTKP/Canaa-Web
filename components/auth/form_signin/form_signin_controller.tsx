import { getAuthUser, signInUser } from "@/repositories/userAuth";
import { formatterError } from "@/utils/formatterError";
import { FirebaseError } from "firebase/app";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface IVerifyAuthUser {
  setUser: React.Dispatch<React.SetStateAction<any>>;
  router: AppRouterInstance;
}

export async function verifyAuthUser({ setUser, router }: IVerifyAuthUser) {
  const user = getAuthUser();
  if (user) {
    setUser(user);
    router.push("/home");
  }
}

interface IOnSignIn {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  router: AppRouterInstance;
}

export async function onSignIn({
  e,
  setIsLoading,
  setUser,
  router,
}: IOnSignIn) {
  e.preventDefault();
  setIsLoading(true);
  const dataUser = formatDataUser(e);
  if (verifyDataUser(dataUser)) {
    try {
      const userAuth = await signInUser({
        email: dataUser.email,
        password: dataUser.password,
      });
      console.log(userAuth);
    //   if (user) {
    //     setUser(user);
    //     router.push("/home");
    //   } else {
    //     toast.error("Email ou senha inválidos");
    //   }
    } catch (error) {
        formatterError(error);
    }
  }
  setIsLoading(false);
}

function formatDataUser(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  var dataUser: { email: string; password: string } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  return dataUser;
}

function verifyDataUser({ email, password }: Record<string, string>) {
  if (email.length >= 4 && password.length >= 6) {
    return true;
  }
  toast.error("Faltou informação para efetuar seu cadastro!");
  return false;
}
