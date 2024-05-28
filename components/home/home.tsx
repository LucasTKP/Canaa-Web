"use client";

import { UserContext } from "@/context/userContext";
import { auth } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { onGetMeeting } from "./home_controller";

function Home() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [meetings, setMeetings] = useState<Array<MeetingModel> | null>(null);

  useEffect(() => {
    onGetMeeting(setMeetings);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-x-[20px]">
        <button onClick={() => signOut(auth)}>Sair</button>
        {user?.isAdmin && (
          <button onClick={() => router.push("/admin")}>
            Painel de Administrador
          </button>
        )}
      </div>
      {meetings &&
        meetings.map((meeting) => {
          return (
            <div key={meeting.id}>
              <p>{`Reunião do dia: ${meeting.date}`}</p>
              <p>{`Tema: ${meeting.theme}`}</p>
              <button>Marcar Presença</button>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
