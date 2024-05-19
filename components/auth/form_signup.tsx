import { enumEye } from "@/models/enum_eye";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Form_signup() {
  const [eye, setEye] = React.useState<enumEye>(enumEye.Close);

  return (
    <div>
      <h1 className="font-poiretOne text-[45px] max-sm:text-[40px] max-xsm:text-[35px] mt-[10px]">
        Cadastre
      </h1>
      <h2 className="font-poiretOne text-[30px] max-sm:text-[27px] max-xsm:text-[25px]">
        Registre seus dados
      </h2>
      <form className="mt-[15px] flex flex-col gap-y-[10px]">
        <label className="flex flex-col">
          <p className="text-[18px]">Nome Completo</p>
          <input
            placeholder="Digite seu nome "
            type="email"
            required={true}
            className="p-[10px] rounded-[8px] border-black border-[1px] bg-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[18px]">Email</p>
          <input
            placeholder="Digite seu email"
            type="email"
            required={true}
            className="p-[10px] rounded-[8px] border-black border-[1px] bg-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[18px]">Senha</p>
          <div className="rounded-[8px] border-black border-[1px] flex items-center">
            <input
              placeholder="Digite sua senha"
              type={eye == enumEye.Close ? "password" : "text"}
              required={true}
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
        <label className="flex flex-col">
          <p className="text-[18px]">Confirme sua senha</p>
          <div className="rounded-[8px] border-black border-[1px] flex items-center">
            <input
              placeholder="Digite novamente sua senha"
              type={eye == enumEye.Close ? "password" : "text"}
              required={true}
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
        <label className="flex flex-col">
          <p className="text-[18px]">Você já fez o acampamento Canaã?</p>
          <select
            name="select"
            className="rounded-[8px] border-black border-[1px] bg-transparent p-[8px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
          >
            <option value="Não" className="bg-background">
              Não
            </option>
            <option value="Sim" className="bg-background">
              Sim
            </option>
          </select>
        </label>

        <button className="w-full mt-[20px] p-[10px] rounded-[8px] bg-primary text-[18px] font-[500] hover:brightness-95 duration-200">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
