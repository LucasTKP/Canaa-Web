import React, { useEffect, useState } from "react";
import Header from "./header";
import { DotsHorizontalIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { onGetMeetings } from "./table_meeting";
import { MeetingModel } from "@/models/meeting";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";

function TableMeetings() {
  const [meetings, setMeetings] = useState<MeetingModel[] | null>(null);
  useEffect(() => {
    onGetMeetings({ setMeetings: setMeetings });
  }, []);
  return (
    <div className="w-[800px] h-[400px] border-terciary border-[1px] rounded-[10px]">
      {meetings == null ? (
        <div className="w-full h-full flex items-center justify-center">
          <p>Nenhuma reunião foi encontrada</p>
        </div>
      ) : (
        <>
          <Header meetings={meetings} />
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

          {meetings?.map((meeting) => {
            return (
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
          })}
        </>
      )}
    </div>
  );
}

export default TableMeetings;
