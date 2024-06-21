import { db } from "@/lib/firebase_config";
import { IDataAuthUser, UserModel } from "@/models/user";
import { setDoc, doc, getDoc, updateDoc, collection, getDocs, orderBy } from "firebase/firestore";

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
    photo: dataAuthUser.photo,
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


export async function updateUser(data: UserModel) {
  await updateDoc(doc(db, "users", data.id), {
    ...data,
  });
}
