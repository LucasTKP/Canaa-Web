import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { UserModel } from "@/models/user";

interface HeaderProps {
  users: UserModel[]
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ users, setTextSearch}: HeaderProps) {
  return (
    <div className="flex p-[15px] max-xsm:p-[10px]items-center gap-x-[20px]">
      <p className="text-[18px] max-xsm:text-[14px] text-terciary/80">
        <span className="font-[500] text-terciary">{users.length}</span>{" "}
        usuários
      </p>
      <label className="flex justify-between border-terciary border-[1px] rounded-[5px] items-center px-[5px] w-[50%] max-xsm:text-[12px]">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          className="rounded-l-[5px] bg-transparent outline-none w-full"
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <MagnifyingGlassIcon width={20} height={20} />
      </label>
    </div>
  );
}

export default Header;
