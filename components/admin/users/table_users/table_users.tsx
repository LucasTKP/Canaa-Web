"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { filterUsers, onGetUsers, sortLastPresenceUsers } from "./table_users_controller";
import {
  toFormattedDateDDMMYYYYToString,
  toFormattedDateToString,
} from "@/utils/functions/formmatter_date";
import DialogEditUser from "../dialog_edit_user/dialog_edit_user";
import Footer from "./footer";
import { UserModel } from "@/models/user";

interface typeFilters {
  date: "asc" | "desc";
}

function TableUsers() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [userSelect, setUserSelect] = useState<UserModel | null>(null);
  const [textSearch, setTextSearch] = useState<string>("");
  const [filters, setFilters] = useState<typeFilters>({
    date: "asc",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 8,
    minPage: 1,
  });

  useEffect(() => {
    onGetUsers({ setUsers:setUsers });
  }, []);

  function handleFilterDate() {
    setFilters({ date: filters.date == "asc" ? "desc" : "asc" });
    sortLastPresenceUsers({ users, action: filters.date });
  }

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return (
    <div className="max-w-[800px] w-full min-h-[400px] max-xsm:min-h-[365px] border-terciary border-[1px] rounded-[10px] flex flex-col flex-1">
      <Header users={users} setTextSearch={setTextSearch} />
      {users.length == 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <p>Nenhum usuário foi encontrado</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[60%_40%] gap-[1%] px-[15px] border-y-[1px] border-terciary bg-terciary/20 items-center text-[17px] max-xsm:text-[16px] font-[600] py-[5px] ">
            <p>Tema</p>
            <button
              onClick={() => handleFilterDate()}
              className="flex items-center justify-center"
            >
              <p>Data</p>
              <TriangleDownIcon
                className={`${
                  filters.date == "asc" ? "" : "rotate-180"
                } duration-200`}
              />
            </button>
          </div>

          {filterUsers({ users, textSearch }).length > 0 ? (
            (() => {
              const result = [];
              const filteredUsers = filterUsers({ users, textSearch });
              for (let i = 0; i < filteredUsers.length; i++) {
                const user = filteredUsers[i];

                if (i + 1 < pagination.minPage) continue;
                if (i + 1 > pagination.maxPage) break;

                result.push(
                  <div
                    onClick={() => setUserSelect(user)}
                    key={user.id}
                    className="grid grid-cols-[60%_40%] gap-[1%] px-[15px] py-[3px] border-b-[1px] border-terciary bg-background hover:brightness-90 cursor-pointer max-xsm:text-[15px] "
                  >
                    <p className="truncate">{user.name}</p>
                    <p className="text-center">
                      {width > 475
                        ? toFormattedDateToString(user.lastPresence)
                        : toFormattedDateDDMMYYYYToString(user.lastPresence)}
                    </p>
                  </div>
                );
              }
              return result;
            })()
          ) : (
            <p className="w-full h-[200px] flex items-center justify-center">
              Nenhuma reunião foi encontrada com este nome
            </p>
          )}
          <Footer
            users={users}
            textSearch={textSearch}
            pagination={pagination}
            setPagination={setPagination}
          />
        </>
      )}
      {/* {userSelect && (
        <DialogEditUser
          setUsers={setUsers}
          userSelect={userSelect}
          setUserSelect={setUserSelect}
        />
      )} */}
    </div>
  );
}

export default TableUsers;
