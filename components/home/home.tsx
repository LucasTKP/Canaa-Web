"use client";

import { UserContext } from "@/context/userContext";
import { auth } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { onGetMeeting, onGetPresences } from "./home_controller";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";
import DialogConfirmPresence from "./dialog_confirm_presence/dialog_confirm_presence";
import { PresenceModel } from "@/models/presence";

function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState<Array<MeetingModel> | null>(null);
  const [presences, setPresences] = useState<Array<PresenceModel> | null>(null);

  useEffect(() => {
    if(!user) return;

    onGetMeeting(setMeetings);
    onGetPresences(setPresences);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex gap-x-[20px]">
        <button onClick={() => signOut(auth)}>Sair</button>
        {user?.isAdmin && (
          <button onClick={() => router.push("/admin")}>
            Painel de Administrador
          </button>
        )}
      </div>
      {meetings && (
        <div className="flex flex-col">
          <p>Reuniões de hoje:</p>
          {meetings.map((meeting) => {
            const isPresenceConfirmeted = presences?.find(
              (presence) => presence.id_meeting === meeting.id
            );
            return (
              <div
                key={meeting.id}
                className="flex flex-col gap-y-[5px] p-[10px] border-[1px] border-gray-500 rounded-[5px] mt-[10px]"
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
      )}
    </div>
  );
}

export default Home;
