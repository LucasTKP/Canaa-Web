import { MeetingModel } from "@/models/meeting";
import { getAllMeetings } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

interface onGetMeetingsProps{
    setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[] | null>>
}
export async function onGetMeetings({ setMeetings }: onGetMeetingsProps) {
  try {
    const meetings = await getAllMeetings();
    setMeetings(meetings);
  } catch (error) {
    console.log(error);
    formatterError(error);
  }
}