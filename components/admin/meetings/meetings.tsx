"use client";
import React from "react";
import TableMeetings from "./table_meetings/table_meetings";

function Meetings() {
  return (
    <div className="w-full pr-[15px]">
      <h2 className="font-poiretOne text-[40px] text-terciary mt-[25px]">
        Reuniões
      </h2>
      <div className="md:ml-[15px] pr-[15px] mt-[15px] w-full">
        <TableMeetings />
      </div>
    </div>
  );
}

export default Meetings;
