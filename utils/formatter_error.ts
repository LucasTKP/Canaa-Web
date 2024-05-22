import { toast } from "react-toastify";

export function formatterError(generalError: any) {
  var error = generalError.message

  if (generalError as FirebaseAuthError) {
    switch (generalError.code) {
      case "auth/too-many-requests":
        error =
          "Muitas tentativas de login. Por favor, tente novamente mais tarde.";
        break;
      case "auth/wrong-password":
        error = "Senha inválida. Por favor, tente novamente.";
        break;
      case "auth/user-not-found":
        error = "Email inválido. Por favor, tente novamente.";
        break;
      case "auth/user-disabled":
        error =
          "Este usário foi desabilitado. Por favor, entre em contato com o administrador.";
        break;
      case "auth/email-already-in-use":
        error = "Este email ja existe. Por favor, tente outro.";
        break;
      case "auth/invalid-email":
        error = "Email inválido. Por favor, tente novamente.";
        break;
    }
  }
  return toast.error(error);
}
