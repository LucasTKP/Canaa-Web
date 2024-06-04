import { auth } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import { PresenceModel } from "@/models/presence";
import { UserModel } from "@/models/user";
import { getSomeMeetings } from "@/repositories/meetingFireStore";
import { getPresences } from "@/repositories/presenceFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

export async function onGetMeeting(
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[] | null>>
) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  try {
    const meetings = await getSomeMeetings(date);

    if (meetings !== null) setMeetings(meetings);
  } catch (error) {
    formatterError(error);
  }
}

export async function onGetPresences(
  setPresences: React.Dispatch<React.SetStateAction<PresenceModel[] | null>>,
) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const user = auth.currentUser;
  
  try {
    const presences = await getPresences(date, user!.uid);

    if (presences !== null) setPresences(presences);
  } catch (error) {
    formatterError(error);
  }
}
