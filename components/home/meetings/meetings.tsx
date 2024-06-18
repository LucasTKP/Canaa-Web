'use client';
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
    meetings && (
      <div className="flex flex-col mt-[70px] bg-terciary/30 p-[15px] rounded-[4px] w-[600px]">
        <h2 className="font-poiretOne text-[40px] text-black">
          Reuniões
        </h2>
        {meetings.map((meeting) => {
          const isPresenceConfirmeted = presences?.find(
            (presence) => presence.id_meeting === meeting.id
          );
          return (
            <div
              key={meeting.id}
              className="flex flex-col gap-y-[5px] p-[15px] border-[2px] border-gray-500 rounded-[5px] mt-[10px] text-[20px]"
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
                <p className="text-[#00B37E]">Presença confirmada</p>
              ) : (
                <DialogConfirmPresence meeting={meeting} />
              )}
            </div>
          );
        })}
      </div>
    )
  );
}

export default Meetings;
