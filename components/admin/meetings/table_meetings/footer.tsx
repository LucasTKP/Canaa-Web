import React from "react";
import { filterMeetings } from "./table_meetings_controller";
import { MeetingModel } from "@/models/meeting";

interface FooterProps {
  meetings: MeetingModel[];
  textSearch: string;
  pagination: { page: number; maxPage: number; minPage: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; maxPage: number; minPage: number }>
  >;
}
function Footer({
  meetings,
  textSearch,
  pagination,
  setPagination,
}: FooterProps) {
  return (
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
          pagination.page >=
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
  );
}

export default Footer;
