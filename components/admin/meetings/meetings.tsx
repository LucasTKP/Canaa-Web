"use client";
import React from "react";
import TableMeetings from "./table_meetings/table_meetings";

function Meetings() {
  return (
    <div>
      <h2 className="font-poiretOne text-[40px] text-terciary mt-[15px]">Reuniões</h2>
      <div className="ml-[15px] mt-[15px]">
        <TableMeetings />
      </div>
    </div>
  );
}

export default Meetings;
