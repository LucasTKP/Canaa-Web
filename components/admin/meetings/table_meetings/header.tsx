import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import DialogRegisterMeeting from "../dialog_create_meeting/dialog_create_meeting";
import { MeetingModel } from "@/models/meeting";

interface HeaderProps {
  meetings: MeetingModel[];
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
}

function Header({ meetings, setTextSearch, setMeetings }: HeaderProps) {
  return (
    <div className="flex p-[15px] justify-between">
      <p className="text-[18px] text-terciary/80">
        <span className="font-[500] text-terciary">{meetings.length}</span>{" "}
        reuniões
      </p>
      <label className="flex justify-between border-terciary border-[1px] rounded-[5px] items-center px-[5px] w-[50%]">
        <input
          type="text"
          placeholder="Digite o tema da reunião"
          className="rounded-l-[5px] bg-transparent outline-none w-full"
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <MagnifyingGlassIcon width={20} height={20} />
      </label>
      <DialogRegisterMeeting setMeetings={setMeetings} />
    </div>
  );
}

export default Header;
