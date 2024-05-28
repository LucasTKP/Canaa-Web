import { MeetingModel } from "@/models/meeting";
import { getMeetings } from "@/repositories/meetingFireStore";
import { formatterError } from "@/utils/formatter_error";

export async function onGetMeeting(
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[] | null>>
) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  try {
    const result = await getMeetings(date);
    if (result !== null) {
      setMeetings(result);
    }
  } catch (error) {
    formatterError(error);
  }
}
