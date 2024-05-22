import { enumEye } from "@/models/enum_eye";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { useContext, useEffect, useState } from "react";
import { onSignIn, verifyAuthUser } from "./form_signin_controller";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function Form_signin() {
  const [eye, setEye] = React.useState<enumEye>(enumEye.Close);
  const [loading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    verifyAuthUser({setUser, router});
  }, []);

  return (
    <div>
      <h1 className="font-poiretOne text-[45px] max-sm:text-[40px] max-xsm:text-[35px] mt-[10px]">
        Login
      </h1>
      <h2 className="font-poiretOne text-[30px]  max-sm:text-[27px] max-xsm:text-[25spx]">
        Entre com seus dados
      </h2>
      <form
        onSubmit={(e) => onSignIn({ e, setIsLoading, setUser, router })}
        className="mt-[15px]"
      >
        <label className="flex flex-col">
          <p className="text-[18px]">Email</p>
          <input
            placeholder="Digite seu email"
            type="email"
            required={true}
            name="email"
            className="p-[10px] rounded-[8px] border-black border-[1px] bg-transparent"
          />
        </label>

        <label className="flex flex-col mt-[15px]">
          <p className="text-[18px]">Senha</p>
          <div className="rounded-[8px] border-black border-[1px] flex items-center">
            <input
              placeholder="Digite sua senha"
              type={eye == enumEye.Close ? "password" : "text"}
              required={true}
              name="password"
              className="p-[10px] rounded-[8px] bg-transparent w-full outline-none"
            />
            {eye == enumEye.Close ? (
              <EyeClosedIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Open)}
              />
            ) : (
              <EyeOpenIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Close)}
              />
            )}
          </div>
        </label>
        <p className="text-[14px] underline text-[#2E86AB] text-end hover:filter hover:brightness-75 duration-200 cursor-pointer">
          Esqueci a senha
        </p>

        <button className="w-full mt-[20px] p-[10px] rounded-[8px] bg-primary text-[18px] font-[500] hover:brightness-95 duration-200">
          Entrar
        </button>
      </form>
    </div>
  );
}
