import { signInUser } from "@/repositories/userAuth";
import { formatterError } from "@/utils/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface IOnSignIn {
  e: FormEvent<HTMLFormElement>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function onSignIn({ e, setIsLoading }: IOnSignIn) {
  e.preventDefault();
  setIsLoading(true);
  const dataUser = formatDataUser(e);
  if (verifyDataUser(dataUser)) {
    try {
      await signInUser({
        email: dataUser.email,
        password: dataUser.password,
      });
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
