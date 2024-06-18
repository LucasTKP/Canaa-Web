import { MeetingModel } from "@/models/meeting";
import { getAllMeetings } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

interface onGetMeetingsProps {
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
}
export async function onGetMeetings({ setMeetings }: onGetMeetingsProps) {
  try {
    const meetings = await getAllMeetings();
    setMeetings(sortDateMeetings({meetings, action: "desc"}));
  } catch (error) {
    console.log(error);
    formatterError(error);
  }
}


interface FilterMeetingsProps {
  meetings: MeetingModel[];
  textSearch: string;
}

export function filterMeetings({
  meetings,
  textSearch,
}: FilterMeetingsProps): MeetingModel[] {
  const meetingsFiltered = meetings.filter((meeting) =>
    meeting.theme.includes(textSearch)
  );
  return meetingsFiltered;
}
interface sortDateMeetingsProps {
  meetings: MeetingModel[];
  action: "asc" | "desc";
}


export function sortDateMeetings({meetings, action} : sortDateMeetingsProps): MeetingModel[] {
  if(action === "asc"){
    return meetings.sort((a, b) => a.date.getTime() - b.date.getTime());
  } else {
    return meetings.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
