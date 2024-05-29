import { db } from "@/lib/firebase_config";
import { IDataAuthUser, UserModel } from "@/models/user";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

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
    photo: "",
  };
  if (dataAuthUser.madeCaneDate) {
    dataUser.madeCaneDate = dataAuthUser.madeCaneDate;
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

export async function updateUser(data: UserModel) {
  await updateDoc(doc(db, "users", data.id), {
    ...data,
  });
}
