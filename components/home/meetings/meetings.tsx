"use client";
import { MeetingModel } from "@/models/meeting";
import { PresenceModel } from "@/models/presence";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";
import React, { useEffect, useState } from "react";
import DialogConfirmPresence from "../dialog_confirm_presence/dialog_confirm_presence";
import { onGetMeeting, onGetPresences } from "../home_controller";

function Meetings() {
  const [meetings, setMeetings] = useState<Array<MeetingModel> | null>(null);
  const [presences, setPresences] = useState<Array<PresenceModel> | null>(null);

  useEffect(() => {
    onGetMeeting(setMeetings);
    onGetPresences(setPresences);
  }, []);

  return (

      <div className="flex flex-col mt-[70px] max-xl:mt-[45px] max-md:mt-[30px] bg-terciary/30 p-[15px] rounded-[4px] w-[600px] max-xl:w-[430px] max-lg:w-[360px] max-md:w-full">
        <h2 className="font-poiretOne text-[40px] max-xl:[36px] max-lg:text-[34px] max-md:text-[32px]  text-black">
          Reuniões
        </h2>
            {meetings ? 
        meetings.map((meeting) => {
          const isPresenceConfirmeted = presences?.find(
            (presence) => presence.id_meeting === meeting.id
          );
          return (
            <div
              key={meeting.id}
              className="flex flex-col gap-y-[5px] p-[15px] border-[2px] border-gray-500 rounded-[5px] mt-[10px] text-[20px] max-xl:text-[18px]"
            >
              <p>
                <span className="font-[500]">Data:</span>
                {toFormattedDateToString(meeting.date)}
              </p>
              <p>
                <span className="font-[500]">Tema:</span>
                {meeting.theme}
              </p>
              {isPresenceConfirmeted ? (
                <div className="p-[6px] max-sm:p-[4px] text-[18px] max-xl:text-[16px] font-[500] bg-[#193218] text-background rounded-[4px] hover:brightness-95 duration-200 text-center">
                  Presença Registrada
                </div>
              ) : (
                <DialogConfirmPresence
                  meeting={meeting}
                  setPresences={setPresences}
                />
              )}
            </div>
          );
        })
      : 
      <p className="text-[20px] py-[10px]">Nenhuma reunião cadastrada para o dia de hoje</p>
      }
      </div>
    )

}

export default Meetings;
