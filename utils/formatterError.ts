import { toast } from "react-toastify";

export function formatterError(generalError: any){
    var error = generalError;

    if(error as FirebaseAuthError){
        if(error.code === "auth/email-already-in-use"){
            error = "Este email já foi cadastrado. Por favor, tente outro.";
        }
    }


    return toast.error(error);
}