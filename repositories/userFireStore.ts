import { db, storage } from "@/lib/firebase_config";
import { IDataAuthUser, UserModel } from "@/models/user";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  orderBy,
  deleteField,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import path from "path";
import { getPresencesByMeeting } from "./presenceFireStore";

interface IPropsCreateUserFireStore {
  dataAuthUser: IDataAuthUser;
  idAuthUser: string;
}
export async function createUserFireStore({
  dataAuthUser,
  idAuthUser,
}: IPropsCreateUserFireStore) {
  var dataUser: UserModel = {
    id: idAuthUser,
    name: dataAuthUser.name,
    email: dataAuthUser.email,
    madeCane: dataAuthUser.madeCane,
    lastPresence: new Date(),
    totalPresence: 0,
    namePhoto: dataAuthUser.namePhoto,
    photoUrl: dataAuthUser.photoUrl,
    madeCaneYear: null,
  };
  if (dataAuthUser.madeCaneYear) {
    dataUser.madeCaneYear = dataAuthUser.madeCaneYear;
  }

  await setDoc(doc(db, `users`, idAuthUser), dataUser);
}

export async function getUser(idUser: string): Promise<UserModel | null> {
  const docSnap = await getDoc(doc(db, "users", idUser));
  if (docSnap.exists()) {
    return UserModel.fromJSON(docSnap.data());
  }
  return null;
}

export async function getAllUsers(): Promise<Array<UserModel>> {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: Array<UserModel> = [];
  querySnapshot.forEach((doc) => {
    users.push(UserModel.fromJSON(doc.data()));
  });
  return users;
}

export async function getAllUsersByMeeting(
  idMeeting: string
): Promise<Array<UserModel>> {
  const allPresences = await getPresencesByMeeting(idMeeting);
  const users: Array<UserModel> = [];
  if (allPresences && allPresences.length > 0) {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const user = UserModel.fromJSON(doc.data());
      if (allPresences.find((presence) => presence.id_user == user.id)) {
        users.push(user);
      }
    });
  }
  return users;
}

export async function updateUser(data: UserModel) {
  await updateDoc(doc(db, "users", data.id), {
    ...data,
  });
}
