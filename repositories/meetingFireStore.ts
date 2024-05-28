import { db } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export async function createMeeting(dataMeeting: Omit<MeetingModel, "id">) {
  const docRef = doc(collection(db, "meetings"));
  const id = docRef.id;

  await setDoc(docRef, {...dataMeeting, id });
}

export async function getMeetings(
  date: Date
): Promise<Array<MeetingModel> | null> {
  const q = query(collection(db, "meetings"), where("date", "==", date));

  const querySnapshot = await getDocs(q);
  const meetings: Array<MeetingModel> = [];
  querySnapshot.forEach((doc) => {
    meetings.push(MeetingModel.fromJSON(doc.data()));
  });
  if (meetings.length > 0) {
    return meetings;
  }
  return null;
}
