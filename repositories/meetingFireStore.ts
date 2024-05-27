import { db } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import {addDoc, collection } from "firebase/firestore";

export async function createMeeting(dataMeeting: Omit<MeetingModel, "id">) {
  await addDoc(collection(db, `meetings`), dataMeeting);
}
