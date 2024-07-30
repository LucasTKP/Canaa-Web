import { auth } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import { PresenceModel } from "@/models/presence";
import { getSomeMeetings } from "@/repositories/meetingFireStore";
import { getPresences } from "@/repositories/presenceFireStore";
import { formatterError } from "@/utils/functions/formatter_error";

export async function onGetMeeting(
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[] | null>>
) {
  try {
    const meetings = await getSomeMeetings();

    if (meetings !== null) setMeetings(meetings);
  } catch (error) {
    formatterError(error);
  }
}

export async function onGetPresences(
  setPresences: React.Dispatch<React.SetStateAction<PresenceModel[] | null>>
) {
  const user = auth.currentUser;

  try {
    const presences = await getPresences(user!.uid);

    if (presences !== null) setPresences(presences);
  } catch (error) {
    formatterError(error);
  }
}
