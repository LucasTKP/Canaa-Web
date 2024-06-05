import React, { useEffect, useState } from "react";
import Header from "./header";
import { DotsHorizontalIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { filterMeetings, onGetMeetings } from "./table_meeting";
import { MeetingModel } from "@/models/meeting";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";

function TableMeetings() {
  const [meetings, setMeetings] = useState<MeetingModel[]>([]);
  const [textSearch, setTextSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 8,
    minPage: 1,
  });
  useEffect(() => {
    onGetMeetings({ setMeetings: setMeetings });
  }, []);
  return (
    <div className="w-[800px] min-h-[400px] border-terciary border-[1px] rounded-[10px] flex flex-col">
      {meetings.length == 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <p>Nenhuma reunião foi encontrada</p>
        </div>
      ) : (
        <>
          <Header
            meetings={meetings!}
            setTextSearch={setTextSearch}
            setMeetings={setMeetings}
          />
          <div className="grid grid-cols-[50%_37%_10%] gap-[1%] px-[15px] border-y-[1px] border-terciary bg-terciary/20 items-center text-[17px] font-[600] py-[5px] ">
            <button className="flex items-center">
              <p>Tema</p>
              <TriangleDownIcon />
            </button>
            <button className="flex items-center justify-center">
              <p>Data</p>
              <TriangleDownIcon />
            </button>
            <p className="text-center">Opções</p>
          </div>

          {filterMeetings({ meetings, textSearch }).length > 0 ? (
            (() => {
              const result = [];
              const filteredMeetings = filterMeetings({ meetings, textSearch });
              for (let i = 0; i < filteredMeetings.length; i++) {
                const meeting = filteredMeetings[i];

                if (i + 1 < pagination.minPage) continue;
                if (i + 1 > pagination.maxPage) break;

                result.push(
                  <div
                    key={meeting.id}
                    className="grid grid-cols-[50%_37%_10%] gap-[1%] px-[15px] py-[3px] border-b-[1px] border-terciary"
                  >
                    <p className="truncate">{meeting.theme}</p>
                    <p className="text-center">
                      {toFormattedDateToString(meeting.date)}
                    </p>
                    <button className="cursor-default">
                      <DotsHorizontalIcon className="mx-auto w-[25px] h-[25px] cursor-pointer" />
                    </button>
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
        </>
      )}
      <div className="flex justify-between items-center mt-auto px-[15px] pb-[5px] pt-[10px]">
        <button
          disabled={pagination.page == 1}
          className="bg-terciary/20 px-[10px] rounded-[5px] border-[1px] border-terciary hover:bg-terciary/50 duration-200 disabled:bg-transparent disabled:text-black/40 disabled:border-black/40"
          onClick={() =>
            setPagination({
              page: pagination.page - 1,
              maxPage: pagination.maxPage - 8,
              minPage: pagination.minPage - 8,
            })
          }
        >
          Anterior
        </button>
        <p>
          Página <span className="font-[500]">{pagination.page}</span> de{" "}
          <span className="font-[500]">
            {Math.ceil(filterMeetings({ meetings, textSearch }).length / 8)}
          </span>
        </p>
        <button
          disabled={
            pagination.page ==
            Math.ceil(filterMeetings({ meetings, textSearch }).length / 8)
          }
          onClick={() =>
            setPagination({
              page: pagination.page + 1,
              maxPage: pagination.maxPage + 8,
              minPage: pagination.minPage + 8,
            })
          }
          className="bg-terciary/20 px-[10px] rounded-[5px] border-[1px] border-terciary hover:bg-terciary/50 duration-200 disabled:bg-transparent disabled:text-black/40 disabled:border-black/40"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default TableMeetings;
