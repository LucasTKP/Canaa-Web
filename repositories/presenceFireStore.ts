import { PresenceModel } from '@/models/presence';
import { db } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function createPresence(dataPresence: Omit<PresenceModel, "id">) {
  const docRef = doc(collection(db, "presences"));
  const id = docRef.id;

  await setDoc(docRef, { ...dataPresence, id });
}

export async function getPresences(date: Date, idUser:string): Promise<Array<PresenceModel> | null> {
   const q = query(
     collection(db, "presences"),
     where("date", "==", date),
     where("id_user", "==", idUser)
   );

   const querySnapshot = await getDocs(q);
   const precences: Array<PresenceModel> = [];
   querySnapshot.forEach((doc) => {
     precences.push(PresenceModel.fromJSON(doc.data()));
   });
   if (precences.length > 0) {
     return precences;
   }
   return null;
}