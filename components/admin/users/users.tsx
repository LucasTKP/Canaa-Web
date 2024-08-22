import React from "react";
import TableUsers from "./table_users/table_users";

interface UsersProps {
  idMeeting?: string;
  nameMeeting?: string;
}


function Users({ idMeeting, nameMeeting}: UsersProps) {
  return (
    <div className="w-full md:pr-[15px]">
      <h2 className="font-poiretOne text-[40px] max-xl:[36px] max-lg:text-[34px] max-md:text-[32px]  text-terciary mt-[25px] line-clamp-2">
        {nameMeeting === undefined
          ? "Usuários"
          : "Presenças da Reunião: " + nameMeeting}
      </h2>
      <div className="md:ml-[15px] pr-[15px] mt-[15px] w-full">
        <TableUsers idMeeting={idMeeting} />
      </div>
    </div>
  );
}

export default Users;
