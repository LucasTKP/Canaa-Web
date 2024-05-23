import { enumEye } from "@/models/enum_eye";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { useContext, useState } from "react";
import { onSignIn } from "./form_signin_controller";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";



export default function Form_signin() {
  const [eye, setEye] = React.useState<enumEye>(enumEye.Close);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1 className="font-poiretOne text-[45px] max-sm:text-[40px] max-xsm:text-[35px] mt-[10px]">
        Login
      </h1>
      <h2 className="font-poiretOne text-[30px]  max-sm:text-[27px] max-xsm:text-[25spx]">
        Entre com seus dados
      </h2>
      <form
        onSubmit={(e) => onSignIn({ e, setIsLoading })}
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

        <button
          disabled={isLoading}
          className="w-full mt-[20px] p-[6px] rounded-[8px] bg-primary text-[18px] font-[500] hover:brightness-95 duration-200 flex justify-center items-center text-background"
        >
          {isLoading ? (
            <svg
              className="mr-3 h-6 w-6 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
