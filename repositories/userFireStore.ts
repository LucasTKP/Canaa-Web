import { db } from "@/lib/firebase_config";
import { setDoc, doc, getDoc } from "firebase/firestore";

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
  if(dataAuthUser.madeCaneDate){
    dataUser.madeCaneDate = dataAuthUser.madeCaneDate
  }

  await setDoc(doc(db, `users`, idAuthUser), dataUser);
}

export async function getUser(idUser: string) {
  const docSnap = await getDoc(doc(db, "users", idUser));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  }
}
