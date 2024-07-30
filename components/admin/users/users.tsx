import React from "react";
import TableUsers from "./table_users/table_users";

function Users() {
  return (
    <div className="w-full md:pr-[15px]">
      <h2
        className="font-poiretOne text-[40px] max-xl:[36px] max-lg:text-[34px] max-md:text-[32px]  text-terciary mt-[25px]"
      >
        Usuários
      </h2>
      <div className="md:ml-[15px] pr-[15px] mt-[15px] w-full">
        <TableUsers />
      </div>
    </div>
  );
}

export default Users;
