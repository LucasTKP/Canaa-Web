import React, { use, useEffect, useState } from "react";
import Header from "./header";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import {
  filterMeetings,
  onGetMeetings,
  sortDateMeetings,
} from "./table_meeting";
import { MeetingModel } from "@/models/meeting";
import {
  toFormattedDateDDMMYYYYToString,
  toFormattedDateToString,
  toFormattedDateYYYYMMDDToString,
} from "@/utils/functions/formmatter_date";
import DialogEditMeeting from "../dialog_edit_meeting/dialog_edit_meeting";

interface typeFilters {
  date: "asc" | "desc";
}

function TableMeetings() {
  const [meetings, setMeetings] = useState<MeetingModel[]>([]);
  const [meetingSelect, setMeetingSelect] = useState<MeetingModel | null>(null);
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
    onGetMeetings({ setMeetings: setMeetings });
  }, []);

  function handleFilterDate() {
    setFilters({ date: filters.date == "asc" ? "desc" : "asc" });
    sortDateMeetings({ meetings, action: filters.date });
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
          <div className="grid grid-cols-[60%_40%] gap-[1%] px-[15px] border-y-[1px] border-terciary bg-terciary/20 items-center text-[17px] max-xsm:text-[16px] font-[600] py-[5px] ">
            <button className="flex items-center">
              <p>Tema</p>
              <TriangleDownIcon />
            </button>
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
                    onClick={() => setMeetingSelect(meeting)}
                    key={meeting.id}
                    className="grid grid-cols-[60%_40%] gap-[1%] px-[15px] py-[3px] border-b-[1px] border-terciary bg-background hover:brightness-90 cursor-pointer max-xsm:text-[15px] "
                  >
                    <p className="truncate">{meeting.theme}</p>
                    <p className="text-center">
                      {width > 475
                        ? toFormattedDateToString(meeting.date)
                        : toFormattedDateDDMMYYYYToString(meeting.date)}
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
      {meetingSelect && (
        <DialogEditMeeting
          setMeetings={setMeetings}
          meetingSelect={meetingSelect}
          setMeetingSelect={setMeetingSelect}
        />
      )}
    </div>
  );
}

export default TableMeetings;
